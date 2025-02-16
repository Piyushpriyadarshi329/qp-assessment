import axios from "axios";
import React, { useState,useEffect } from "react";
import { GETPRODUCT_URL,CREATEPRODUCT_URL } from "../../config/URL"




const ProductTable: React.FC = () => {

    const [products, setproducts] = useState<any>([])
    const [loader, setloader] = useState<boolean>(false)
    const [newProduct, setNewProduct] = useState<any>({
        id: 0,
        productName: "",
        price: undefined,
        Stock: undefined,
    });

    const [isFormOpen, setIsFormOpen] = useState(false);



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

    const handleSubmit =async (e: React.FormEvent) => {
        if(loader){
            return
        }
        e.preventDefault();
        if (!newProduct.productName || newProduct.price <= 0 || newProduct.Stock < 0) {
            alert("Please enter valid product details!");
            return;
        }
        setloader(true)
        let res:any =await axios.post(CREATEPRODUCT_URL,{productName:newProduct.productName,price:Number(newProduct.price),stock:Number(newProduct.Stock)})
        console.log("res",res)
        setloader(false)
        getProduct()
        setNewProduct({ id: 0, productName: "", price: undefined, Stock: undefined });
        setIsFormOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };



    return (
        <div className="flex flex-col w-full justify-center items-center min-h-screen bg-gray-700">
            {isFormOpen && <>
                <div className="mb-6 bg-gray p-6 rounded-md shadow-lg w-96">
                    <h2 className="text-lg font-bold mb-4 text-center">Add Product</h2>
                    <button onClick={() => {
                        setIsFormOpen(false);

                    }}>
                        close
                    </button>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="productName"
                            value={newProduct.productName}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <input
                            type="number"
                            name="Stock"
                            value={newProduct.Stock}
                            onChange={handleChange}
                            placeholder="Stock Quantity"
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-700">
                           {loader?(
                            <>
                            <p>
                                ....
                            </p>
                            </>
                           ):(
                            <>
                            <p>
                            Add Product
                            </p>
                            </>
                           )} 
                        </button>
                    </form>
                </div>
            </>}

            <div className="flex flex-row">
                <h2 className="text-xl font-bold mb-4 text-center">🛒 Product List</h2>
            </div>
            <div className="flex w-full flex-row justify-end">
                <button
                    onClick={() => {
                        setIsFormOpen(true)
                    }}
                    className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Product
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300 mt-2">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Product Name</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product:any) => (
                        <tr key={product.id} className="text-center hover:bg-gray-800">
                            <td className="border p-2">{product.id}</td>
                            <td className="border p-2">{product.productName}</td>
                            <td className="border p-2">₹{product.price}</td>
                            <td className="border p-2">{product.Stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
