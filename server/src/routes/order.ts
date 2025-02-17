import express from 'express'
const router = express.Router();
const {getOrder,createOrder,getOrderById} = require("./../controller/order.controller")

router.post('/orderbyuserid', getOrder);
router.post('/',createOrder);
router.post('/:id',getOrderById);


export default router;

