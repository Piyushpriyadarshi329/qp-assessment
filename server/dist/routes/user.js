"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getAllUser, createUser, getUserById, loginUser } = require("./../controller/user.controller");
router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', loginUser);
exports.default = router;
