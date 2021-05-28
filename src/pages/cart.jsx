import {useEffect} from "react"
import {useStateContext} from "./state-context.js"
import { incrementCartItemOnServerFn,
         decrementCartItemOnServerFn,
         deleteCartItemOnServerFn,
         fetchCartFromServerFn,
         moveCartItemToWishListOnServerFn} from "../apiCalls.js"

export function Cart(){
  
    const {state,dispatch,userId}=useStateContext()
    useEffect(()=>{fetchCartFromServerFn(dispatch,userId)},[])
    let cartValue=state.cart.reduce((acc,{productId,qty})=>acc+(parseInt(productId.price,10)*qty),0)
    let gst=Math.round(cartValue*0.12)
    

    return<div>
    <h2>Cart</h2>
    
    {state.cart.map(({productId,qty})=><div className="h-card border" key={productId._id}>
      <img src={productId.image} alt="" className="image"/> 
      {console.log("qty from cart",qty)}
      <div>
      <h4>{productId.pName}</h4>
      <div>₹{productId.price*qty}</div>
      
      <button
       onClick={()=>decrementCartItemOnServerFn(dispatch,userId,productId._id,qty)}
      >-</button>

      {/* item quantity in cart  */}
      <small className="border">{qty}</small>

      <button
      onClick={()=>incrementCartItemOnServerFn(dispatch,userId,productId._id,qty)}
      >+</button>  <br/>
      <button
      onClick={()=>deleteCartItemOnServerFn(dispatch,userId,productId._id)}
      >DELETE</button>
       <button
      onClick={()=>moveCartItemToWishListOnServerFn(dispatch,userId,productId._id,productId)}
      >MOVE TO WISHLIST</button>
      <br/>
      <small>{productId.creator}</small>
      </div>

    </div>)}
    

    {/* cart total bill division */}
    <div className="h-card-text ">
      
      <div className="wide-row bold">Items  ({state.cart.length})</div>
      <hr/>
      <div className="border">
      <div className="wide-row"><div>Cart Total </div> ₹{cartValue}</div>
      <div className="wide-row">GST<div>₹{gst}</div> </div>
      <div className="wide-row">Shipping Charges <div><span style={{color:"green"}}>FREE</span></div> </div>
      <hr/>
      <div className="wide-row bold">TOTAL <div>₹{cartValue+gst}</div> </div>
      </div>
    </div>
    </div>
  }