import express, { Request, Response  } from "express";

const app = express();
import adminRouter  from "./routes/admin"
import userRouter from "./routes/user"
import productRouter from "./routes/product"
import orderRouter  from "./routes/order"
import cors from "cors"
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; 



app.get("/", (req:Request, res : Response) => {
  res.send({
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