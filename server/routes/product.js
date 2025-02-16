const express = require('express');
const router = express.Router();
const {getAllProduct,createProduct,updateProduct} = require("./../controller/product.controller")

router.get('/', getAllProduct);
router.post('/',createProduct);
router.post('/update',updateProduct);


module.exports = router;

