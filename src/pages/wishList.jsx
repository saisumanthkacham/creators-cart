
import {useStateContext} from "./state-context.js"
import {fetchWishListFromServerFn,
        deleteWishListItemOnServerFn,
        moveWishListItemToCartOnServerFn} from "../apiCalls.js"
import {useEffect} from "react"

export function WishList(){
    const {state,dispatch,userId}=useStateContext()
   useEffect(()=>fetchWishListFromServerFn(dispatch,userId),[])
   const qty=1;

return <div className="products">

   {state.wishList.map(({productId})=> <div key={productId._id} className="card border">
   <img src={productId.image} alt="" className="image"/> 
   <h3>{productId.pName}</h3>
   <div>₹{productId.price}</div>
  
   
      <button
      onClick={()=>moveWishListItemToCartOnServerFn(dispatch,userId,productId._id,productId,qty)}
      >MOVE TO CART</button>
      <button
      onClick={()=>deleteWishListItemOnServerFn(dispatch,userId,productId._id)}
      >DELETE</button>

   </div>)}
   </div>


}