import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import { addCategoryController, getCategoryController } from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.post('/add-category', auth, addCategoryController);
categoryRouter.get('/get-category', getCategoryController);
export default categoryRouter;
