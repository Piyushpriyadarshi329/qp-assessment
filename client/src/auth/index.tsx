
import {  Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";



export default function index() {
  return (

    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  )
}
