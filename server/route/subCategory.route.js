import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import { addSubCategoryController, getSubCategoryController } from '../controllers/subCategory.controller.js';
const subCategoryRouter = Router();

subCategoryRouter.post('/add-sub-category',auth, addSubCategoryController);
subCategoryRouter.post('/get-sub-category', getSubCategoryController);

export default subCategoryRouter;