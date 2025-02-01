import UserModel from '../models/user.model.js';
import CartProductModel from '../models/cartproduct.model.js';

export const addProductToCartController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        message: 'Product id is required',
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        success: false,
      });
    }

    const checkProduct = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });
    if (checkProduct) {
      return res.status(400).json({
        message: 'Product already added to cart',
        error: true,
        success: false,
      });
    }

    const cartItem = new CartProductModel({
      userId: userId,
      productId: productId,
      quantity: 1,
    });

    const saveCartItem = await cartItem.save();
    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      { $push: { shoppingCart: productId } }
    );

    if (!updateCartUser) {
      return res.status(400).json({
        message: 'Failed to add product to cart',
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: 'Product added to cart successfully',
      success: true,
      error: false,
      data: saveCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCartItemsController = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItems = await CartProductModel.find({ userId: userId }).populate(
      'productId'
    )
    return res.status(200).json({
      message: 'Cart items fetched successfully',
      success: true,
      error: false,
      data: cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateCartItemQtyController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({
        message: 'Product id is required',
        error: true,
        success: false,
      });
    }

    
    const cartItem = await CartProductModel.findOne({
      userId: userId,
      _id: productId,
    });
    if (!cartItem) {
      return res.status(404).json({
        message: 'Cart item not found',
        error: true,
        success: false,
      });
    }
    if(quantity <= 0) {
      return res.status(400).json({
        message: 'Quantity must be greater than 0',
        error: true,
        success: false,
      });
    }
    cartItem.quantity = quantity;
    const updatedCartItem = await cartItem.save();

    return res.status(200).json({
      message: 'Product quantity updated successfully',
      success: true,
      error: false,
      data: updatedCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    })
  }
}

export const deleteCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        message: 'Product id is required',
        error: true,
        success: false,
      });
    }

    const cartItem = await CartProductModel.findOne({
      userId: userId,
      _id: productId,
    });
    if (!cartItem) {
      return res.status(404).json({
        message: 'Cart item not found',
        error: true,
        success: false,
      });
    }

    const deletedCartItem = await cartItem.deleteOne();

    return res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
      error: false,
      data: deletedCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false, 
      })
    }
  }
