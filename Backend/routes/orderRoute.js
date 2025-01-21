import express from 'express';
import axios from 'axios';

import { verifyRazorPay,placeOrder,placeOrderStripe,placeOrderRazorPay,allOrders,userOrders,updateStatus,verifyStripe } from '../controllers/orderController.js';

import adminAuth from '../middleware/adminAuth.js';

import authUser from '../middleware/auth.js';



const orderRouter=express.Router();

orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//Payment Features

orderRouter.post('/place',authUser,placeOrder);

orderRouter.post('/stripe',authUser,placeOrderStripe);

orderRouter.post('/razorpay',authUser,placeOrderRazorPay);

//use feature

orderRouter.post('/userorders',authUser,userOrders);

//verify stripe
orderRouter.post('/verifyStripe',authUser,verifyStripe);
orderRouter.post('/verifyRazorpay',authUser,verifyRazorPay);

export default orderRouter;