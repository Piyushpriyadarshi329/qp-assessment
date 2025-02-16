import axios from "axios";
import { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../config/URL";
import { AuthContext } from "../App";

const Login = () => {
  const Auth=useContext(AuthContext)  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log(Auth)

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();

   

    let payload={
        email:email,
        password:password
    }
   let res= await axios.post(LOGIN_URL,payload)
   console.log("res",res)

   if(res.data.success){
    Auth.dispatch({ type: "LOGIN",user:res.data.user,payload:res.data.user })
    if(res.data?.user?.isAdmin){
        navigate("/product")
    }else{
        navigate("/order")
    }
   }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">🔐 Login</h2>
        {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
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
      </div>
    </div>
  );
};

export default Login;
