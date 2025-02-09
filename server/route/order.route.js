import {Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import { CashOnDeliveryController } from '../controllers/order.controller.js';

const orderRouter=Router();

orderRouter.post('/cash-on-delivery', auth, CashOnDeliveryController);

export default orderRouter;