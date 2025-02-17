
import { CREATEPRODUCT_URL } from "../../config/URL"
import axiosInstance from "../../config/axiosInterceptors"

export default function AddProduct() {

async function addProduct(){
    try {
        let payload={
            productName:"milk",
            price:50,
            stock:100
        }

        let res:any= await axiosInstance.post(CREATEPRODUCT_URL,payload)
        console.log("res",res)

        
    } catch (error) {
        console.log(error)
    }


}


  return (
    <div>

        <button
        onClick={addProduct}
        >
            Add Product
        </button>
    </div>
  )
}
