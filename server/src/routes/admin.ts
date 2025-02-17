
import express from 'express'
const router = express.Router();
const {getAllAdmin,createAdmin,getAdminById,loginAdmin} = require("./../controller/admin.controller")

router.get('/', getAllAdmin);
router.get('/:id', getAdminById);
router.post('/',createAdmin);
router.post('/login',loginAdmin);


export default router;

