import {Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import { CashOnDeliveryController, paymentController } from '../controllers/order.controller.js';

const orderRouter=Router();

orderRouter.post('/cash-on-delivery', auth, CashOnDeliveryController);
orderRouter.post('/razorpay', auth, paymentController);

export default orderRouter;