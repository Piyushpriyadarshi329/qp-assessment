import axios from "axios";
import { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../config/URL";
import { AuthContext } from "../App";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  const Auth=useContext(AuthContext)  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log(Auth)

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();

   try {
    let payload={
      email:email,
      password:password
  }
 let res= await axios.post(LOGIN_URL,payload)
 if(res.data.success){
  Auth.dispatch({ type: "LOGIN",user:res.data.user,payload:res.data.user })
  localStorage.setItem("token",res.data.token)
  if(res.data?.user?.isAdmin){
      navigate("/product")
  }else{
      navigate("/order")
  }
 }else{
  toast("Incorrect Email or Password")
 }
    
   } catch (error) {
    toast("Incorrect Email or Password")

   }

   

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer/>
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">🔐 Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
           Have not account?{" "}
          <a onClick={()=>{
            navigate("/register")
          }} className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
