import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiUser } from "react-icons/fi";
import { AuthContext } from "../App";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Auth=useContext(AuthContext)

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">MyApp</h2>
          <button onClick={() => setIsOpen(false)} className="text-white">
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex flex-col mt-4 space-y-2">
          {Auth.state.user.isAdmin?(
            <>
            
            <Link to="/product" className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
            <FiHome /> <span onClick={()=>{
                setIsOpen(false)
            }}>Product</span>
          </Link>
          <Link to="/admin" className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
            <FiUser /> <span onClick={()=>{
                setIsOpen(false)
            }}>Admin</span>
          </Link>
          <Link to="/user" className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
            <FiUser /> <span onClick={()=>{
                setIsOpen(false)
            }}>User</span>
          </Link>
          </>
          ):(
            <>
            </>

          )}

          

          <Link to="/order" className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
            <FiHome /> <span onClick={()=>{
                setIsOpen(false)
            }}>Order</span>
          </Link>
          <Link to="/order" className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-700">
            <FiUser /> <span onClick={()=>{
                Auth.dispatch({type:"LOGOUT"})
            }}>Logout</span>
          </Link>
          
        
        </nav>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 bg-gray-900 text-white p-2 rounded-full"
      >
        <FiMenu size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
