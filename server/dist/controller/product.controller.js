"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = __importDefault(require("./../config/db.connection"));
exports.getAllProduct = (req, res) => {
    db_connection_1.default.query("SELECT * FROM Product", (err, rows) => {
        if (err) {
            res.json({
                success: false,
                err,
            });
        }
        else {
            res.json({
                success: true,
                product: rows,
            });
        }
    });
};
exports.createProduct = (req, res) => {
    const { productName, price, stock } = req.body;
    if (!productName || !price || !stock) {
        return res.status(400).json({ error: 'productName, price and stock are required' });
    }
    const sql = 'INSERT INTO Product (productName, price,stock) VALUES (?, ?,?)';
    db_connection_1.default.query(sql, [productName, price, stock,], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
};
exports.updateProduct = (req, res) => {
    const { productId, productName, price, stock } = req.body;
    if (!productId || !price || !stock || !productName) {
        return res.status(400).json({ error: 'productId, productName, price and stock are required' });
    }
    const sql = `update Product set productName = '${productName}', price =${price}, stock=${stock} where id=${productId};`;
    console.log("sql", sql);
    db_connection_1.default.query(sql, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Product update successfully', productId: result.insertId });
    });
};
