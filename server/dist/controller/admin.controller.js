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
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Secret key for JWT
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.getAllAdmin = (req, res) => {
    db_connection_1.default.query("SELECT * FROM GroceryAdmin", (err, rows) => {
        if (err) {
            res.json({
                success: false,
                err,
            });
        }
        else {
            res.json({
                success: true,
                admin: rows,
            });
        }
    });
};
exports.getAdminById = (req, res) => {
    res.json({ message: `Get user with ID: ${req.params.id}` });
};
exports.createAdmin = (req, res) => {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
        return res.status(400).json({ error: 'Name, Email, password and mobile are required' });
    }
    const sql = 'INSERT INTO GroceryAdmin (name, email,mobile,password) VALUES (?, ?,?,?)';
    db_connection_1.default.query(sql, [name, email, mobile, password], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Admin added successfully', adminId: result.insertId });
    });
};
exports.loginAdmin = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password  are required' });
    }
    const token = jsonwebtoken_1.default.sign({ email }, SECRET_KEY, { expiresIn: "24h" });
    console.log("token", token);
    const sql = `select * from GroceryAdmin where email= '${email}' and password = '${password}'`;
    const sql2 = `select * from Customer where email= '${email}' and password = '${password}'`;
    db_connection_1.default.query(sql, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        else {
            if ((result === null || result === void 0 ? void 0 : result.length) === 0) {
                let resultUser = yield db_connection_1.default.promise().query(sql2);
                console.log("resultUser", resultUser[0]);
                if (resultUser[0].length) {
                    res.status(201).json({ success: true, token, message: 'User login successfully', user: Object.assign(Object.assign({}, (_a = resultUser[0]) === null || _a === void 0 ? void 0 : _a[0]), { isAdmin: false }) });
                }
                else {
                    res.status(500).json({ success: false, message: "no user Found" });
                }
            }
            else {
                res.status(201).json({ success: true, token, message: 'Admin login successfully', user: Object.assign(Object.assign({}, result[0]), { isAdmin: true }) });
            }
        }
    }));
};
