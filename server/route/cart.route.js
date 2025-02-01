import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import { addProductToCartController, deleteCartItemController, getCartItemsController, updateCartItemQtyController } from '../controllers/cart.controller.js';
const cartRouter = Router();

cartRouter.post('/add-to-cart', auth, addProductToCartController);
cartRouter.get('/get-cart', auth, getCartItemsController);
cartRouter.put('/update-cart-qty', auth, updateCartItemQtyController);

cartRouter.delete('/remove-from-cart', auth, deleteCartItemController);

export default cartRouter;
