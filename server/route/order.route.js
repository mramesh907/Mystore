import {Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import { cancelOrderController, CashOnDeliveryController, getOrdersController, paymentController, webhookStripe } from '../controllers/order.controller.js';

const orderRouter=Router();

orderRouter.post('/cash-on-delivery', auth, CashOnDeliveryController);
orderRouter.post('/razorpay', auth, paymentController);
orderRouter.post('/webhook', webhookStripe);
orderRouter.get('/get-order', auth, getOrdersController);
orderRouter.post('/cancel-order',auth,cancelOrderController);

export default orderRouter;