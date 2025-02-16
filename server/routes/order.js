const express = require('express');
const router = express.Router();
const {getOrder,createOrder,getOrderById} = require("./../controller/order.controller")

router.get('/', getOrder);
router.post('/',createOrder);
router.post('/:id',getOrderById);


module.exports = router;

