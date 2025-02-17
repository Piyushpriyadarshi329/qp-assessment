"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = __importDefault(require("./../config/db.connection"));
exports.getOrder = (req, res) => {
    const { userId } = req.body;
    db_connection_1.default.query(`SELECT 
    o.id AS orderId, 
    o.userId, 
    o.orderStatus, 
    i.qty, 
    i.productId,
    p.productName,
    p.price
FROM CustomerOrder o
JOIN CustomerSubOrder i ON o.id = i.orderId
JOIN Product p ON i.productId = p.id
where userId=${userId}
ORDER BY o.id;`, (err, rows) => {
        if (err) {
            res.json({
                success: false,
                err,
            });
        }
        else {
            res.json({
                success: true,
                order: rows,
            });
        }
    });
};
exports.getOrderById = (req, res) => {
    res.json({ message: `Get user with ID: ${req.params.id}` });
};
exports.createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, products } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        // Insert order into CustomerOrder
        const sql1 = 'INSERT INTO CustomerOrder (userId, orderStatus) VALUES (?, ?)';
        const [orderResult] = yield db_connection_1.default.promise().query(sql1, [userId, 'Pending']);
        const orderId = orderResult.insertId;
        // Insert products into CustomerSubOrder
        const sql2 = 'INSERT INTO CustomerSubOrder (orderId, productId, QTY) VALUES ?';
        const productValues = products.map((p) => [orderId, p.id, p.QTY]);
        products.map((p) => __awaiter(void 0, void 0, void 0, function* () {
            const sql3 = `UPDATE Product SET Stock = Stock - ${p.QTY} WHERE id = ${p.id};`;
            yield db_connection_1.default.promise().query(sql3);
        }));
        yield db_connection_1.default.promise().query(sql2, [productValues]);
        res.status(201).json({ message: 'Order created successfully', orderId, success: true });
    }
    catch (error) {
        // Rollback the transaction on error
        // connection.rollback(() => {
        //   console.error('Transaction Failed:', error);
        //   res.status(500).json({ error: 'Database error' });
        // });
        res.json({
            success: false,
            error,
        });
    }
});
