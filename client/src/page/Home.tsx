import Sidebar from "./Sidebar";
import {  Routes, Route } from "react-router-dom";
import Product from "./Product/index"
import Admin from "./admin"
import User from "./user"
import Order from "./order/index"
import CreateOrder from "./order/CreateOrder1";




export default function Home() {
  return (
    <div>
        <>
        <Sidebar/>

        <Routes>
        <Route path="/product" element={<Product />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order" element={<Order />} />
        <Route path="/createorder" element={<CreateOrder />} />

        <Route path="/user" element={<User />} />

      </Routes>
        </>
    </div>
  )
}
