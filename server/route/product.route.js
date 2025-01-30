import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';
import {
  createProductController,
  deleteProductController,
  getProductByCategoryAndSubCategoryController,
  getProductByCategoryController,
  getProductController,
  getProductDetailsController,
  updateProductController,
} from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/add-product', auth,admin, createProductController);
productRouter.post('/get-product', getProductController);
productRouter.post('/get-product-by-category', getProductByCategoryController);
productRouter.post('/get-product-by-category-and-sub-category', getProductByCategoryAndSubCategoryController);
productRouter.post('/get-product-details', getProductDetailsController);

productRouter.put('/update-product', auth,admin, updateProductController);

productRouter.delete('/delete-product', auth, admin, deleteProductController);

export default productRouter;
