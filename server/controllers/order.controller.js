import OrderModel from '../models/order.model.js';
import UserModel from '../models/user.model.js';
import CartProductModel from '../models/cartproduct.model.js';
import ProductModel from '../models/product.model.js';
import mongoose from 'mongoose';
import Stripe from '../config/stripe.js';

export const  CashOnDeliveryController=async(req, res)=> {
  try {    
    const  userId  = req.userId;
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
    console.log(list_items);

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

    return res
      .status(200)
      .json({
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
}

export const priceDiscount = (price, discount = 1) => {
  const discountedPrice = Math.ceil((Number(price) * Number(discount)) / 100);
  const totalPrice = Number(price) - discountedPrice;
  return totalPrice;
};

export const paymentController=async(req, res)=>{
  try {
    const userId = req.userId;
    const user= await UserModel.findById(userId);
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
        unit_amount: priceDiscount(
          item.productId?.price,
          item.productId?.discount
        )*100,
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
}
