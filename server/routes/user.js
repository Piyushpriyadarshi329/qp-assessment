const express = require('express');
const router = express.Router();
const {getAllUser,createUser,getUserById,loginUser} = require("./../controller/user.controller")

router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/',createUser);
router.post('/login',loginUser);


module.exports = router;

