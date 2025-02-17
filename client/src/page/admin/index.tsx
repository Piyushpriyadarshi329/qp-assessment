
import React, { useState,useEffect } from "react";
import { GETADMIN_URL, CREATEADMIN_URL } from "../../config/URL"
import { FiXCircle } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../config/axiosInterceptors";





const index: React.FC = () => {

    const [products, setproducts] = useState<any>([])
    const [loader, setloader] = useState<boolean>(false)
    const [newProduct, setNewProduct] = useState<any>({
        id: 0,
        name: "",
        email: undefined,
        password: undefined,
        mobile:undefined
    });

    const [isFormOpen, setIsFormOpen] = useState(false);



    useEffect(()=>{
    getProduct()
    },[])


    async function getProduct(){
    try {
        let res:any= await axiosInstance.get(GETADMIN_URL)
        console.log("res",res)
        if(res.data.success){
            setproducts(res?.data?.admin)

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


        if (!newProduct.name || !newProduct.email  || !newProduct.password || !newProduct.mobile) {
            alert("Please enter valid Admin details!");
            return;
        }
        setloader(true)
        // const { name, email,mobile, password } = req.body;

        let res:any =await axiosInstance.post(CREATEADMIN_URL,{name:newProduct.name,email:newProduct.email,password:newProduct.password,mobile:newProduct.mobile})
        console.log("res",res)
        if(res.data.success){
            toast("Admin create successfully")
        }
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
            <ToastContainer/>
            {isFormOpen && <>
                <div className="mb-6 bg-gray p-6 rounded-md shadow-lg w-96">
                     <div className="flex justify-end w-full">
                                            <FiXCircle
                                                onClick={() => {
                                                    setIsFormOpen(false);
                    
                                                }}
                                            />
                                        </div>
                    <h2 className="text-lg font-bold mb-4 text-center">Add Admin</h2>
                  

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={newProduct.Name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <input
                            type="text"
                            name="email"
                            value={newProduct.Email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <input
                            type="text"
                            name="mobile"
                            value={newProduct.Mobile}
                            onChange={handleChange}
                            placeholder="Mobile"
                            className="w-full p-2 border rounded-md"
                            required
                        />
                          <input
                            type="text"
                            name="password"
                            value={newProduct.Password}
                            onChange={handleChange}
                            placeholder="Password"
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
                            Add Admin
                            </p>
                            </>
                           )} 
                        </button>
                    </form>
                </div>
            </>}

            <div className="flex flex-row">
                <h2 className="text-xl font-bold mb-4 text-center">Admin List</h2>
            </div>
            <div className="flex w-full flex-row justify-end">
                <button
                    onClick={() => {
                        setIsFormOpen(true)
                    }}
                    className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Admin
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300 mt-2">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product:any) => (
                        <tr key={product.id} className="text-center hover:bg-gray-800">
                            <td className="border p-2">{product.id}</td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">{product.email}</td>
                            <td className="border p-2">{product.mobile}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default index;
