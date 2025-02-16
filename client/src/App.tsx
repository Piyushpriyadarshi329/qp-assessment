
import { useReducer, createContext } from 'react'
import './App.css'
import Home from './page/Home'
import LoginAuth from "./auth"
import { BrowserRouter as Router } from "react-router-dom";



export const AuthContext = createContext<any>(null)

function App() {

  let initialState: any = {
    login: false,
    user: {}
  }
  const reducer = (state:any, action:any) => {
    switch (action.type) {
      case "LOGIN":
        return { login: true };
  
      case "LOGOUT":
        return { login: false, user:{} };
  

  
      default:
        return state;
    }
  };
  



  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <Router>
        <AuthContext.Provider value={{ state, dispatch }} >
          {state.login ? <Home /> : <LoginAuth />}
        </AuthContext.Provider>
      </Router>


    </>
  )
}

export default App
