const express = require('express');
const router = express.Router();
const {getOrder,createOrder,getOrderById} = require("./../controller/order.controller")

router.post('/orderbyuserid', getOrder);
router.post('/',createOrder);
router.post('/:id',getOrderById);


module.exports = router;

