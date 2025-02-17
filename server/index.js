const express = require("express");
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const orderRouter = require("./routes/order")
const cors= require("cors")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const tokenVerify = require("./middleware/tokenVerify")

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Secret key for JWT



app.get("/", (req, res) => {
  res.json({
    success: true,
    message:"this is home page",
  });
});

app.use(cors());
app.use(express.json())
// app.use(tokenVerify)


app.use("/admin",adminRouter)
app.use("/user",tokenVerify,userRouter)
app.use("/product",tokenVerify,productRouter)
app.use("/order",tokenVerify,orderRouter)



app.listen(5000, () => console.log("listining on port 5000"));