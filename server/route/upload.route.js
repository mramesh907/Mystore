import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import uploadImageController from '../controllers/uploadImage.controller.js';
import upload from '../middleware/multer.middleware.js';


const uploadRouter = Router();

uploadRouter.post('/upload', auth,upload.single('image') ,uploadImageController);

export default uploadRouter;
