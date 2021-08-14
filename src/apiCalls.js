import axios from "axios"
import {toast} from "react-toastify"

// fetching product data from server
    export async function GetDataFromServerFn(dispatch) {
        console.log("loading data from server")

        try{
            toast.info(`Fetching data from server...`,{position:"bottom-right",autoClose:2000})
            const {data}=await axios.get("https://creators-cart-DB.sumanth5234.repl.co/products")
            dispatch({type:"GET-DATA-FROM-SERVER",payLoad:data.data})
            console.log("inside the func",data.data)
        }

        catch(err){
            console.log(err)
        }

    }

// cart backend functionalities

// fetching the cart from the db
    export async function fetchCartFromServerFn(dispatch,userId){
        try{
            const resp= await axios(
                {method:"get",
                url:`https://creators-cart-DB.sumanth5234.repl.co/users/${userId}/cart`,
            })

            const cartData= resp.data.cart
            console.log(cartData)
            resp.status===200 ? dispatch({type:"FETCH-CART-FROM-SERVER",payLoad:cartData}) : console.log("error from fetchCartFromServerFn")  
        }
        catch(err){
        console.log("cannot fetch the cart from server",err)
        }  
    }


// adding product item to the cart on DB
    export async function addToCartOnServerFn(dispatch,userId,productId,qty){
        try{
            toast.info(`adding to cart...`,{position:"bottom-right",autoClose:3000})
            const resp= await axios(
                {method:"post",
                url:`https://creators-cart-DB.sumanth5234.repl.co/users/${userId}/cart`,
                data:{"productId":productId,"qty":1}
            })
            console.log("addtocart response from server",resp)
            resp.status===201&& toast.info(`added to cart sucessfully!!`,{position:"bottom-right"})
            resp.status===201?dispatch({type:"ADD-TO-CART",payLoad:{productId,qty}}): console.log("error from addtoCartApifn")
            
        }
        catch(err){
        console.log("cannot add the product to cart",{error:err})
        toast.error(`error in adding product to cart!!`,{position:"bottom-right"})
        }  
    }



// incrementing the product qty in  cart on backend
    export async function incrementCartItemOnServerFn(dispatch,userId,productId,qty){
        qty= qty+1; 
        try{
            toast.info(`incrementing the quantity...`,{position:"bottom-right",autoClose:3000})
            console.log("from line 66",productId)
            const resp= await axios(
            {method:"post",
                url:`https://creators-cart-db.sumanth5234.repl.co/users/${userId}/cart/${productId}`,
                data:{"qty":qty}
            })
            resp.status===201 ? dispatch({type:"INCREMENT-CART-ITEM",payLoad:{id:productId}}) : toast.error(`error in incrementing the quantity`,{position:"bottom-right"})
           
        }
        catch(err){
        console.log("eror could not increment the cart item",err)
        }  
    }

// decrementing the product qty in cart on backend
 export async function decrementCartItemOnServerFn(dispatch,userId,productId,qty){
        qty= qty-1; 
        try{
            toast.info(`decrementing the quantity...`,{position:"bottom-right",autoClose:3000})
            const resp= await axios(
                {method:"post",
                url:`https://creators-cart-db.sumanth5234.repl.co/users/${userId}/cart/${productId}`,
                data:{"qty":qty}
            })
            
            resp.status===201 ? dispatch({type:"DECREMENT-CART-ITEM",payLoad:{id:productId}}) :  toast.error(`error in decrementing the quantity`,{position:"bottom-right"})
           
        }
        catch(err){
            console.log("eror could not decrement the item",err)
        }  

    }

// deleting the cart item on backend
export async function deleteCartItemOnServerFn(dispatch,userId,productId){
    try
        {
         console.log("from line 100",productId)
         const resp= await axios(
        {method:"delete",
        url:`https://creators-cart-db.sumanth5234.repl.co/users/${userId}/cart/${productId}`,})

         resp.status===200 ? dispatch({type:"DELETE-CART-ITEM",payLoad:{id:productId}}) : toast.error(`error in deleting the product from cart`,{position:"bottom-right"})   
     }
     catch(err){
        console.log("eror could not delete the cart item",err)
    }  
      
}

// moving cart item to wishlist on backend= deleting on cart + adding to wishlist on backend + MOVE TO WISHLIST using reducer on front end
    export async function moveCartItemToWishListOnServerFn(dispatch,userId,productId,product,qty){
        try{
            toast.info(`moving product to wishlist...`,{position:"bottom-right",autoClose:2000})
            await deleteCartItemOnServerFn(dispatch,userId,productId)
            await moveToWishListOnServerFn(dispatch,userId,productId,product,qty)
        }
        catch(err){
            console.log("error could not move the cart Item to wishList",err)
        }
    }

        async function moveToWishListOnServerFn(dispatch,userId,productId,product,qty){
            try{
                const resp=  await axios({
                method:"post",
                url:`https://creators-cart-db.sumanth5234.repl.co/users/${userId}/wishList`,
                data:{"productId":productId,"qty":qty}
                })

                console.log("from line 129 move to wishlist response",resp,productId,qty)
                resp.status===201?dispatch({type:"MOVE-TO-WISHLIST",payLoad:{product,qty}}) :toast.error(`error in moving product to wishlist`,{position:"bottom-right"})
                resp.status===201&&toast.info(`sucessfully moved product to wishlist`,{position:"bottom-right"})
            }
            catch(err){
                console.log("error in moving the item from cart to wishlist",err)
            }

         }


// wishList backend functionalities 

// fetching the cart from the db
    export async function fetchWishListFromServerFn(dispatch,userId){
        try{
            toast.info(`loading...`,{position:"bottom-right",autoClose:2000})
            const resp= await axios(
                {method:"get",
                url:`https://creators-cart-DB.sumanth5234.repl.co/users/${userId}/wishList`,
             })

            const wishListData= resp.data.wishList
            console.log({wishListData})
            resp.status===200 ? dispatch({type:"FETCH-WISHLIST-FROM-SERVER",payLoad:wishListData}) : toast.error(`error fetching wishList Data`,{position:"bottom-right",autoClose:2000})
        }
        catch(err){
            console.log("cannot fetch the wishList from server",err)
            
        }  
         
    }

// deleting the wishList item on backend
 export async function deleteWishListItemOnServerFn(dispatch,userId,productId){
        try{
            
            console.log("from line 166",productId)
            const resp= await axios(
                {method:"delete",
                url:`https://creators-cart-db.sumanth5234.repl.co/users/${userId}/wishList/${productId}`,
            
            })
            resp.status===200 ? dispatch({type:"DELETE-WISHLIST-ITEM",payLoad:{id:productId}}) : toast.error(`error deleting product from wishlist`,{position:"bottom-right"})
           
        }
        catch(err){
            console.log("eror could not delete the wishList item",err)
        }  
         
    }

//    moving item from cart to wishlist= deleting from wishlist on db+adding to cart on db+ MOVE TO CART in reducer func
    export async function moveWishListItemToCartOnServerFn(dispatch,userId,productId,product,qty){
        try{
            toast.info(`moving product to cart...`,{position:"bottom-right",autoClose:2000})
            await deleteWishListItemOnServerFn(dispatch,userId,productId)
            await moveToCartOnServerFn(dispatch,userId,productId,product,qty)
        }
        catch(err){
            console.log("eror could not move the cart Item to wishList",err)
        }
    }


        async function moveToCartOnServerFn(dispatch,userId,productId,product,qty){
            try{
                const resp=  await axios({
                method:"post",
                url:`https://creators-cart-db.sumanth5234.repl.co/users/${userId}/cart`,
                data:{"productId":productId,"qty":1}
                })
    
                resp.status===201?dispatch({type:"MOVE-TO-CART",payLoad:{product,qty}}) : toast.error(`error in moving product to cart`,{position:"bottom-right"})
                resp.status===201&&toast.info(`successfully moved product to cart`,{position:"bottom-right",autoClose:2000})
            }
            catch(err){
                console.log("error in moving the item from wishlist to cart",err)
             }

        }

    export async function addToWishListOnServerFn(dispatch,userId,productId){

        try{
            toast.info(`adding product to wishlist...`,{position:"bottom-right",autoClose:2000})
            const resp= await axios(
                {method:"post",
                    url:`https://creators-cart-DB.sumanth5234.repl.co/users/${userId}/wishList`,
                    data:{"productId":productId}
                })
            console.log("payload from add to wishlist",productId)
            console.log("addtoWishList response from server",resp)
            resp.status===201?dispatch({type:"ADD-TO-WISHLIST",payLoad:productId}): toast.error(`error in adding product to wishlist...`,{position:"bottom-right"})
            resp.status===201&&toast.info(` product added to wishlist`,{position:"bottom-right"})
        }
        catch(err){
            console.log("error in adding the product to wishlist ",err)
        }

    }
    