import {Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import { addAddressController, getAddressController } from '../controllers/address.controller.js';
const addressRouter = Router();


addressRouter.post('/add-address', auth, addAddressController);
addressRouter.get('/get-address', auth, getAddressController);

export default addressRouter;