import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import {
  createProductController,
  getProductByCategoryAndSubCategoryController,
  getProductByCategoryController,
  getProductController,
  getProductDetailsController,
} from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/add-product', auth, createProductController);
productRouter.post('/get-product', getProductController);
productRouter.post('/get-product-by-category', getProductByCategoryController);
productRouter.post('/get-product-by-category-and-sub-category', getProductByCategoryAndSubCategoryController);
productRouter.post('/get-product-details', getProductDetailsController);

export default productRouter;
