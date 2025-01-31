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
