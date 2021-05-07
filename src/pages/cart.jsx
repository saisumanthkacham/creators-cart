import {useStateContext} from "./state-context.js"


export function Cart(){
  
    const {state,dispatch}=useStateContext()
    let cartValue=state.cart.reduce((acc,item)=>acc+(parseInt(item.price,10)*item.qty),0)
    let gst=Math.round(cartValue*0.12)
    

    return<div>
    <h2>Cart</h2>
    
    {state.cart.map(item=><div className="h-card border" key={item.id}>
      <img src={item.image} alt="" className="image"/> 

      <div>
      <h4>{item.pName}</h4>
      <div>₹{item.price*item.qty}</div>
      
      <button
       onClick={()=>dispatch({type:"DECREMENT-IN-CART",payLoad:item})}
      >-</button>
      <small className="border">{item.qty}</small>
      <button
      onClick={()=>dispatch({type:"INCREMENT-IN-CART",payLoad:item})}
      >+</button>  <br/>
      <button
      onClick={()=>dispatch({type:"DELETE-IN-CART",payLoad:item})}
      >DELETE</button>
       <button
      onClick={()=>dispatch({type:"MOVE-TO-WISHLIST",payLoad:item})}
      >MOVE TO WISHLIST</button>
      <br/>
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