import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GETUSER_URL } from "../config/URL";
import { ToastContainer, toast } from 'react-toastify';



const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
      setError("All fields are required");
      return;
    }
    let payload={
      name:formData.name,
      email:formData.email,
      mobile:formData.mobile,
      password:formData.password
    }
    let res= await axios.post(GETUSER_URL,payload)
    if(res.data.success){
      toast("User Register successfully")
    }


    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer/>
      <div className="bg-gray p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">📝 Register</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a onClick={()=>{
            navigate("/")
          }} className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
