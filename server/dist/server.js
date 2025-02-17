"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const product_1 = __importDefault(require("./routes/product"));
const order_1 = __importDefault(require("./routes/order"));
const cors_1 = __importDefault(require("cors"));
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "this is home page",
    });
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/admin", admin_1.default);
app.use("/user", user_1.default);
app.use("/product", product_1.default);
app.use("/order", order_1.default);
app.listen(5000, () => console.log("listining on port 5000"));
