import axios from "axios"

export async function addToCartApiFn(prod,dispatch){
    try{
        const resp= await axios(
            {method:"post",
            url:"https://ecom-api.sumanth5234.repl.co/cart",
            data:prod
        })
        if(resp.status===201)
        {
            dispatch({type:"ADD-TO-CART",payLoad:prod})
        }
        else 
        {
            console.log("error from addtoCartApifn")
        }

    }
   
  catch(err){
        console.log("error from server in apiCalls.js",err)
    }  
         
 }

 export async function fetchCartFromServerFn(dispatch){
    try{
        const resp= await axios(
            {method:"get",
            url:"https://ecom-api.sumanth5234.repl.co/cart",
        })
        if(resp.status===200)
        {
            dispatch({type:"FETCH-CART-FROM-SERVER",payLoad:resp.data})
        }
        else 
        {
            console.log("error from addtoCartApifn")
        }

    }
   
  catch(err){
        console.log("error from server in apiCalls.js",err)
    }  
         
 }

