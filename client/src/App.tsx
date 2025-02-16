
import { useReducer, createContext ,useEffect} from 'react'
import './App.css'
import Home from './page/Home'
import LoginAuth from "./auth"
import {  useNavigate } from "react-router-dom";



export const AuthContext = createContext<any>(null)

function App() {
  const navigate = useNavigate();


  useEffect(()=>{
  autoLogin()
  },[])

  async function autoLogin(){
    let data:any = await localStorage.getItem("login")

    console.log("JSON.parse(data).user",JSON.parse(data).user)
    if(data){
      dispatch({ type: "LOGIN",payload:JSON.parse(data).user})

    }

  }

  let initialState: any = {
    login: false,
    user: {}
  }
  const reducer = (state:any, action:any) => {
    console.log("action",action)
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("login",JSON.stringify({ login: true ,user:action.payload}))
        return { login: true ,user:action.payload};
  
      case "LOGOUT":
        localStorage.removeItem("login")
        // window.location.replace("http://127.0.0.1:5173/");
        navigate("/")
        return { login: false, user:{} };

  

  
      default:
        return state;
    }
  };
  



  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
        <AuthContext.Provider value={{ state, dispatch }} >
          {state.login ? <Home /> : <LoginAuth />}
        </AuthContext.Provider>


    </>
  )
}

export default App
