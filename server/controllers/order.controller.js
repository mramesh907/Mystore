import OrderModel from '../models/order.model.js';
import UserModel from '../models/user.model.js';
import CartProductModel from '../models/cartproduct.model.js';
import ProductModel from '../models/product.model.js';
import mongoose from 'mongoose';
import Stripe from '../config/stripe.js';

export const CashOnDeliveryController = async (req, res) => {
  try {
    const userId = req.userId;
    const { list_items, totalAmt, deliveryAddress, subTotalAmt } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ message: 'User id is required', success: false, error: true });
    }
    if (!list_items || !totalAmt || !deliveryAddress || !subTotalAmt) {
      return res
        .status(400)
        .json({ message: 'Provide all fields', success: false, error: true });
    }

    const payload = list_items.map((item) => ({
      userId: userId,
      orderId: `ORDER-${new mongoose.Types.ObjectId()}`,
      productId: item.productId?._id,
      productDetails: {
        name: item.productId?.name,
        image: item.productId?.image,
      },
      paymentId: '',
      paymentStatus: 'CASH ON DELIVERY',
      deliveryAddress: deliveryAddress,
      subTotalAmt: totalAmt,
      totalAmt: subTotalAmt,
    }));
    const updateStock = list_items.map(async (item) => {
      const product = await ProductModel.findOneAndUpdate(
        { _id: item.productId?._id, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
      if (!product)
        throw new Error(`Stock update failed for ${item.productId?.name}`);
    });

    try {
      await Promise.all(updateStock);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        success: false,
        error: true,
      });
    }

    const order = await OrderModel.insertMany(payload);

    if (!order) {
      return res
        .status(400)
        .json({ message: 'Something went wrong', success: false, error: true });
    }
    // Extract order IDs
    const orderIds = order.map((ord) => ord._id);

    // Update user order history
    const userUpdate = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { orderHistory: { $each: orderIds } } }, // Push orderIds to orderHistory array
      { new: true }
    );

    if (!userUpdate) {
      return res.status(400).json({
        message: 'Failed to update order history',
        success: false,
        error: true,
      });
    }

    const removeCart = await CartProductModel.deleteMany({ userId: userId });
    if (!removeCart) {
      return res
        .status(400)
        .json({ message: 'Something went wrong', success: false, error: true });
    }
    const user = await UserModel.updateOne(
      { _id: userId },
      { $set: { shoppingCart: [] } }
    );

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Something went wrong', success: false, error: true });
    }

    return res.status(200).json({
      message: 'Order placed successfully',
      data: order,
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

export const priceDiscount = (price, discount = 1) => {
  const discountedPrice = Math.ceil((Number(price) * Number(discount)) / 100);
  const totalPrice = Number(price) - discountedPrice;
  return totalPrice;
};

export const paymentController = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    const { list_items, totalAmt, deliveryAddress, subTotalAmt } = req.body;
    if (!list_items || !totalAmt || !deliveryAddress || !subTotalAmt) {
      return res
        .status(400)
        .json({ message: 'Provide all fields', success: false, error: true });
    }
    const line_items = list_items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.productId?.name,
          images: item.productId?.image || [],
          metadata: {
            productId: item.productId?._id,
          },
        },
        unit_amount:
          priceDiscount(item.productId?.price, item.productId?.discount) * 100,
      },
      // adjustable_quantity: { enabled: true,minimum:1 },
      quantity: item.quantity,
    }));

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_email: user.email,
      metadata: {
        userId: userId,
        deliveryAddress: deliveryAddress,
        subTotalAmt: subTotalAmt,
        totalAmt: totalAmt,
      },
      line_items: line_items,
      success_url: `${process.env.FRONTEND_URL}/successpayment`,
      cancel_url: `${process.env.FRONTEND_URL}/cancelpayment`,
    };
    const session = await Stripe.checkout.sessions.create(params);

    return res.status(200).json(session);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

const getOrderProductItems = async ({
  lineItems,
  userId,
  addressId,
  paymentId,
  payment_status,
}) => {
  const productList = [];
  if (lineItems?.data?.length) {
    for (const item of lineItems?.data) {
      const product = await Stripe.products.retrieve(item.price.product);
      const payload = {
        userId: userId,
        orderId: `ORDER-${new mongoose.Types.ObjectId()}`,
        productId: product.metadata.productId,
        productDetails: {
          name: product.name,
          image: product.images,
        },
        paymentId: paymentId,
        paymentStatus: payment_status,
        deliveryAddress: addressId,
        subTotalAmt: Number(item.amount_total / 100),
        totalAmt: Number(item.amount_total / 100),
      };
      productList.push(payload);
    }
  }
  return productList;
};

export async function webhookStripe(req, res) {
  const event = req.body;
  const endPointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET;

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(
        session.id
      );
      const userId = session.metadata.userId;

      const orderProduct = await getOrderProductItems({
        lineItems: lineItems,
        userId: userId,
        addressId: session.metadata.deliveryAddress,
        paymentId: session.payment_intent,
        payment_status: session.payment_status,
      });
      const order = await OrderModel.insertMany(orderProduct);
      if (order.length > 0) {
        // Extract Order IDs
        const orderIds = order.map((ord) => ord._id);

        // Update orderHistory in UserModel
        await UserModel.findByIdAndUpdate(
          userId,
          { $push: { orderHistory: { $each: orderIds } }},
          { new: true }
        );
      }
      if (Boolean(order[0])) {
        const removeCartItems = await UserModel.findByIdAndUpdate(userId, {
          shoppingCart: [],
        });
        const removeCartProductDB = await CartProductModel.deleteMany({
          userId: userId,
        });
      } else {
        return res.status(400).json({
          message: 'Something went wrong',
          success: false,
          error: true,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}

export async function getOrdersController(req, res) {
  try {
    const userId = req.userId;
    const orders = await OrderModel.find({ userId: userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: 'Orders fetched successfully',
      data: orders,
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
}

export async function cancelOrderController(req, res) {
  try {
    const userId = req.userId; // Get logged-in user ID
    const { orderId } = req.body; // Order ID from request body
    if (!userId) {
      return res.status(400).json({
        message: 'User ID is required',
        success: false,
        error: true,
      });
    }
    if (!orderId) {
      return res.status(400).json({
        message: 'Order ID is required',
        success: false,
        error: true,
      });
    }
    // Find the order
    const order = await OrderModel.findOne({
      userId: userId,
      orderId: orderId,
    });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
        success: false,
        error: true,
      });
    }

    // Check if the order is already canceled
    if (order.paymentStatus === 'CANCELED') {
      return res.status(400).json({
        message: 'Order is already canceled',
        success: false,
        error: true,
      });
    }

    // Restore stock for the canceled order
    const product = await ProductModel.findById(order.productId);
    if (product) {
      product.stock += 1; // Restore stock
      await product.save();
    }

    // Update order status to CANCELED
    order.paymentStatus = 'CANCELED';
    await order.save();

    return res.status(200).json({
      message: 'Order canceled successfully',
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false,
      error: true,
    });
  }
}
