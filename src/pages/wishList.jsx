
import {useStateContext} from "./state-context.js"


export function WishList(){
    const {state,dispatch}=useStateContext()

   return <div className="products">
  

   {state.wishList.map(prod=> <div key={prod.id} className="card border">
   <img src={prod.image} alt="" className="image"/> 
   <h3>{prod.pName}</h3>
   <div>₹{prod.price}</div>
   <div>Rating:{prod.ratings}</div>
      <button
      onClick={()=>dispatch({type:"MOVE-TO-CART",payLoad:prod})}
      >MOVE TO CART</button>

      {/* have to implement this feat later */}

      <button
      onClick={()=>dispatch({type:"DELETE-FROM-WISHLIST",payLoad:prod})}
      >DELETE</button>

   </div>)}
   </div>


}