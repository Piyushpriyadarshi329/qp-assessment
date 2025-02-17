import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GETORDERBYUSERID_URL } from "../../config/URL";
import { AuthContext } from "../../App";
import axiosInstance from "../../config/axiosInterceptors";

export default function index() {
  const navigate = useNavigate();
  const Auth = useContext(AuthContext)
  console.log("Auth", Auth)


  const [orders, setorders] = useState<any>([])
  async function getOrder() {
    const res = await axiosInstance.post(GETORDERBYUSERID_URL, { userId: Auth.state.user.id })
    if (res.data.success) {
      let localOrder: any = []

      res.data.order?.map((i: any) => {
        const index = localOrder.findIndex((order: any) => order.orderId === i.orderId);
        if (index >= 0) {
          localOrder[index].product.push(i)
        } else {
          localOrder.push({ orderId: i.orderId, product: [i] })
        }
      })

      setorders(localOrder)
    }

  }

  useEffect(() => {
    getOrder()

  }, [])

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex w-full justify-end">
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            navigate("/createorder");
          }}
        >
          Create Order
        </button>
      </div>


      <div>
        <h1 className="text-2xl font-bold mb-4">Order List</h1>

        <div className="flex flex-wrap gap-4 p-4">
          {orders.map((order: any) => (
            <div
              key={order.orderId}
              className="bg-white shadow-lg rounded-2xl p-4 w-80 border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-2 text-blue-600">
                Order ID: {order.orderId}
              </h2>
              <div className="space-y-2">
                {order.product.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                  >
                    <div>
                      <p className="font-medium text-black">{item.productName}</p>
                      <p className="text-sm text-black">₹{item.price} x {item.qty}</p>
                    </div>
                    <p className="font-semibold  text-black">₹{item.price * item.qty}</p>
                  </div>
                ))}
                <p className="font-semibold  text-black">Total Amount: ₹{order.product.reduce((acc: any, cur: any) => acc + (cur.qty * cur.price), 0)}</p>


              </div>
            </div>
          ))}

          {orders?.length === 0 && (
            <div className="w-full justify-center">

              <h1 className="text-2xl font-bold mb-4">No Record Found</h1>
            </div>
          )}
        </div>

      </div>


    </div>
  )
}
