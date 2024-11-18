import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import {
  addCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.post('/add-category', auth, addCategoryController);
categoryRouter.get('/get-category', getCategoryController);
categoryRouter.put('/update-category', auth, updateCategoryController);
categoryRouter.delete('/delete-category', auth, deleteCategoryController);
export default categoryRouter;
