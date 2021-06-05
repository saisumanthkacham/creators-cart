import axios from "axios"


// fetching product data from server
    export async function GetDataFromServerFn(dispatch) {
        console.log("loading data from server")

        try{
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
            const resp= await axios(
                {method:"post",
                url:`https://creators-cart-DB.sumanth5234.repl.co/users/${userId}/cart`,
                data:{"productId":productId,"qty":1}
            })
            console.log("addtocart response from server",resp)
            resp.status===201&& console.log("product added to cart on db")
            resp.status===201?dispatch({type:"ADD-TO-CART",payLoad:{productId,qty}}): console.log("error from addtoCartApifn")
            
        }
        catch(err){
        console.log("cannot add the product to cart",{error:err})
        }  
    }



// incrementing the product qty in  cart on backend
    export async function incrementCartItemOnServerFn(dispatch,userId,productId,qty){
        qty= qty+1; 
        try{
            console.log("from line 66",productId)
            const resp= await axios(
            {method:"post",
                url:`https://creators-cart-db.sumanth5234.repl.co/users/${userId}/cart/${productId}`,
                data:{"qty":qty}
            })
            resp.status===201 ? dispatch({type:"INCREMENT-CART-ITEM",payLoad:{id:productId}}) : console.log("error from incrementCartItemOnServerFn")
            resp.status===201&&console.log("product incremented on backend")
        }
        catch(err){
        console.log("eror could not increment the cart item",err)
        }  
    }

// decrementing the product qty in cart on backend
 export async function decrementCartItemOnServerFn(dispatch,userId,productId,qty){
        qty= qty-1; 
        try{
            const resp= await axios(
                {method:"post",
                url:`https://creators-cart-db.sumanth5234.repl.co/users/${userId}/cart/${productId}`,
                data:{"qty":qty}
            })
            
            resp.status===201 ? dispatch({type:"DECREMENT-CART-ITEM",payLoad:{id:productId}}) : console.log("error from decrementCartItemOnServerFn")
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

         resp.status===200 ? dispatch({type:"DELETE-CART-ITEM",payLoad:{id:productId}}) : console.log("error from deleteCartItemOnServerfn")
     }
     catch(err){
        console.log("eror could not delete the cart item",err)
    }  
      
}

// moving cart item to wishlist on backend= deleting on cart + adding to wishlist on backend + MOVE TO WISHLIST using reducer on front end
    export async function moveCartItemToWishListOnServerFn(dispatch,userId,productId,product,qty){
        try{
            await deleteCartItemOnServerFn(dispatch,userId,productId)
            await moveToWishListOnServerFn(dispatch,userId,productId,product,qty)
        }
        catch(err){
            console.log("eror could not move the cart Item to wishList",err)
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
                resp.status===201?dispatch({type:"MOVE-TO-WISHLIST",payLoad:{product,qty}}) : console.log("error in moving item to wishlist")
            }
            catch(err){
                console.log("error in moving the item from cart to wishlist",err)
            }

         }


// wishList backend functionalities 

// fetching the cart from the db
    export async function fetchWishListFromServerFn(dispatch,userId){
        try{
            const resp= await axios(
                {method:"get",
                url:`https://creators-cart-DB.sumanth5234.repl.co/users/${userId}/wishList`,
             })

            const wishListData= resp.data.wishList
            console.log({wishListData})
            resp.status===200 ? dispatch({type:"FETCH-WISHLIST-FROM-SERVER",payLoad:wishListData}) : console.log("error from fetchWishListFromServerFn")  
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
            resp.status===200 ? dispatch({type:"DELETE-WISHLIST-ITEM",payLoad:{id:productId}}) : console.log("error from deleteWishListItemOnServerfn")
        }
        catch(err){
            console.log("eror could not delete the wishList item",err)
        }  
         
    }

//    moving item from cart to wishlist= deleting from wishlist on db+adding to cart on db+ MOVE TO CART in reducer func
    export async function moveWishListItemToCartOnServerFn(dispatch,userId,productId,product,qty){
        try{
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
        
                console.log("from line 129 move to wishlist response",resp)
                resp.status===201?dispatch({type:"MOVE-TO-CART",payLoad:{product,qty}}) : console.log("error in moving item to cart from wishList")
            }
            catch(err){
                console.log("error in moving the item from wishlist to cart",err)
             }

        }

    export async function addToWishListOnServerFn(dispatch,userId,productId){

        try{
            const resp= await axios(
                {method:"post",
                    url:`https://creators-cart-DB.sumanth5234.repl.co/users/${userId}/wishList`,
                    data:{"productId":productId}
                })
            console.log("payload from add to cart",productId)
            console.log("addtoWishList response from server",resp)
            resp.status===201?dispatch({type:"ADD-TO-WISHLIST",payLoad:productId}): console.log("error from addToWishListOnServerFn")
        }
        catch(err){
            console.log("error in adding the product to wishlist ",err)
        }

    }
    