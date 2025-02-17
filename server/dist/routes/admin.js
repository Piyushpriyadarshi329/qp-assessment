"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getAllAdmin, createAdmin, getAdminById, loginAdmin } = require("./../controller/admin.controller");
router.get('/', getAllAdmin);
router.get('/:id', getAdminById);
router.post('/', createAdmin);
router.post('/login', loginAdmin);
exports.default = router;
