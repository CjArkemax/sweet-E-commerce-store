import {create} from 'zustand';
import axios from "axios";
import {toast} from "react-hot-toast"

const BASE_URL = "http://localhost:3000"


export const useProductStore = create ((set,get)=>({
// products state 
products:[],
loading:false,
error:null,

//form state
formData:{
    name:"",
    price:"",
    image:"",
},

fetchProducts: async () => {
    set({loading:true});
    try {
        const response = await axios.get(`${BASE_URL}/api/products`)
        set({products:response.data.data,error:null});// the first data is from axios and other is from our api 
    } catch (err) {
        if(err.status == 429) set({error:"Rate limit exceeded"})
       else set({error:"Something went wrong"})
    }finally{
        set({loading:false});
    }
},


deleteProduct: async (id) => {

    set({loading:true});

    try {
        await axios.delete(`${BASE_URL}/api/products/${id}`);
        set(prev =>({products:prev.products.filter(product => product.id !== id)}));
        toast.success("Product deleted succesfully");
    } catch (error) {
        console.log("Error in deleteProduct function",error);
        toast.error("Something went wrong");
    }finally{
        set({loading:false});
    }
},

}));