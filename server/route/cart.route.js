import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import { addProductToCartController } from '../controllers/cart.controller.js';
const cartRouter = Router();

cartRouter.post('/add-to-cart', auth, addProductToCartController);
// cartRouter.post('/remove-from-cart', removeFromCartController);

export default cartRouter;
