import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import {
  addSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} from '../controllers/subCategory.controller.js';
const subCategoryRouter = Router();

subCategoryRouter.post('/add-sub-category', auth, addSubCategoryController);
subCategoryRouter.post('/get-sub-category', getSubCategoryController);
subCategoryRouter.put(
  '/update-sub-category',
  auth,
  updateSubCategoryController
);
subCategoryRouter.delete(
  '/delete-sub-category',
  auth,
  deleteSubCategoryController
);

export default subCategoryRouter;
