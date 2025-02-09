import {Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import { addAddressController, deleteAddressCOntroller, getAddressController, updateAddressController } from '../controllers/address.controller.js';
const addressRouter = Router();


addressRouter.post('/add-address', auth, addAddressController);
addressRouter.get('/get-address', auth, getAddressController);
addressRouter.put('/update-address', auth, updateAddressController);
addressRouter.put('/delete-address', auth, deleteAddressCOntroller);

export default addressRouter;