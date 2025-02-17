"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getOrder, createOrder, getOrderById } = require("./../controller/order.controller");
router.post('/orderbyuserid', getOrder);
router.post('/', createOrder);
router.post('/:id', getOrderById);
exports.default = router;
