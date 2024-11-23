import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import {
  createProductController,
  getProductController,
} from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/add-product', auth, createProductController);
productRouter.post('/get-product', getProductController);

export default productRouter;
