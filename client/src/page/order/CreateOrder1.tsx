
import axios from "axios";
import { useState ,useEffect} from "react";
import { CREATEORDER_URL, GETPRODUCT_URL } from "../../config/URL";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


interface Product {
  id: number;
  productName: string;
  price: number;
  stock: number;
}



export default function CreateOrder() {
  const navigate = useNavigate();

      const [products, setproducts] = useState<any>([])
      useEffect(()=>{
        getProduct()
        },[])
    
    
        async function getProduct(){
        try {
            let res:any= await axios.get(GETPRODUCT_URL)
            console.log("res",res)
            if(res.data.success){
                setproducts(res?.data?.product)
    
            }else{
                setproducts([])
     
            }
            
        } catch (error) {
            console.log(error)
            
        }
        }
  

  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: any) => {
    if (cart.filter((i) => i.id === product.id).length) {

      setCart((p: any) => {
        let newData = p;
        const index = newData.findIndex((pro: any) => pro.id === product.id);

        newData[index].QTY = newData[index].QTY ? newData[index].QTY + 1 : 1
        return [...newData]
      })
    } else {
      setCart((prevCart) => [...prevCart, { ...product, QTY: 1 }]);

    }

  };


  async function submitOrder() {
    try {
      let payload = {
        userId: 1,
        products: cart
      }
      let res:any = await axios.post(CREATEORDER_URL, payload)
      if(res.data.success){
       toast("Order Create Successfully");
       navigate("/order");


      }
      setCart([])
    } catch (error) {
      console.log(error)

    }

  }

  return (
    <div className="p-6 flex">
              <ToastContainer />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <table className="w-full border border-gray-900">
          <thead>
            <tr className="bg-gray-900">
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product:any) => (
              <tr key={product.id} className="text-center">
                <td className="p-2 border">{product.productName}</td>
                <td className="p-2 border">{product.Stock}</td>
                <td className="p-2 border">₹{product.price}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="flex-1 ml-4">
        <h2 className="text-xl font-bold ">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <table className="w-full border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-900">
                <th className="p-2 border">SR. N.</th>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Quntity</th>
                <th className="p-2 border">Total Amount</th>


              </tr>
            </thead>
            <tbody>
              {cart.map((item: any, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    <div className="flex flex-row justify-center">

                      <button onClick={() => {
                        setCart((p: any) => {
                          let newData = p;
                          newData[index].QTY = newData[index].QTY ? newData[index].QTY + 1 : 1
                          return [...newData]
                        })
                      }}>
                        +
                      </button>

                      <p style={{ marginLeft: 20, marginRight: 20 }}> {item.productName}  </p>
                      <button onClick={() => {
                        setCart((p: any) => {
                          let newData = p;
                          if (newData[index].QTY === 1) {

                            let filterData = newData.filter((_: any, ind: Number) => ind != index)

                            return [...filterData]
                          } else {
                            newData[index].QTY = newData[index].QTY ? newData[index].QTY - 1 : 1
                            return [...newData]
                          }

                        })
                      }}>
                        -
                      </button>
                    </div>
                  </td>
                  <td className="p-2 border">₹{item.price}</td>
                  <td className="p-2 border">{item.QTY}</td>
                  <td className="p-2 border">₹{item.QTY * item.price}</td>
                </tr>

              ))}
              <tr className="bg-gray-900">
                <td className="p-2 border"></td>
                <td className="p-2 border">Total Price</td>
                <td className="p-2 border"></td>
                <td className="p-2 border"></td>
                <td className="p-2 border">{cart.reduce((acc, cur: any) => (cur.price * cur.QTY) + acc, 0)}</td>


              </tr>
            </tbody>
          </table>
        )}

        {cart.length > 0 && (
          <div className="mt-5">
            <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600"

              onClick={submitOrder}
            >
              Submit Order
            </button>
          </div>
        )}


      </div>


    </div>
  );
}
