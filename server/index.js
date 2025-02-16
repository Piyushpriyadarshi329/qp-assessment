const express = require("express");
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const orderRouter = require("./routes/order")
const cors= require("cors")


app.get("/", (req, res) => {
  res.json({
    success: true,
    message:"this is home page",
  });
});

app.use(cors());
app.use(express.json())


app.use("/admin",adminRouter)
app.use("/user",userRouter)
app.use("/product",productRouter)
app.use("/order",orderRouter)



app.listen(5000, () => console.log("listining on port 5000"));