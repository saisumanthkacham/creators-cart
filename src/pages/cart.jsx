import {useEffect} from "react"
import {useStateContext} from "./state-context.js"
import { incrementCartItemOnServerFn,
         decrementCartItemOnServerFn,
         deleteCartItemOnServerFn,
         fetchCartFromServerFn,
         moveCartItemToWishListOnServerFn} from "../apiCalls.js"
import {useNavigate} from "react-router-dom"
         
export function Cart(){
      const {dispatch,userId,state}=useStateContext()
      let cartLength= state.cart.reduce((acc,prod)=>acc+prod.qty,0)
      useEffect(()=>{fetchCartFromServerFn(dispatch,userId)},[cartLength])
      console.log("line 13 from cart",state.cart)
     
     

return<div >
      

      {cartLength>0 ? <CartItemsExist/> : <CartItemsDontExist/>}

</div>

}



export function CartItemsExist(){

      // utils for cart to function properly
    const discount=0.25; 
    const {state,dispatch,userId}=useStateContext()
    let cartValue=state.cart.reduce((acc,{productId,qty})=>acc+(parseInt(productId.price,10)*qty),0)
    let gst=Math.round(cartValue*0.05)
    let shippingCharges= (cartValue>=750)?"FREE":100
    let total= cartValue*(1-discount)+gst+(shippingCharges==="FREE" ? 0 :50)
    let cartLength= state.cart.reduce((acc,prod)=>acc+prod.qty,0)

 return <section >
      <br/><br/><br/><br/><br/><br/><br/>
     {state.cart.map(({productId,qty})=>
     <div className="cd-horizontal" key={productId._id}>
         <img src={productId.image} alt="" className="cd-img"/>
          
         <div className="cd-delete-icon"
              onClick={()=>deleteCartItemOnServerFn(dispatch,userId,productId._id)}
              ><i className="fas fa-times fa-1x black-font"></i>
         </div>
 
         <div>
               <div  className="column"><br/><br/>
                 <small><h3 className="cd-name">{productId.pName}</h3>&nbsp;{productId.creator}'s Store</small> 
                 <p>{productId.price*(1-discount)*qty} <s className="grey-font"> ₹{productId.price*qty}</s> <span className="green-font">({discount*100}% Off)</span> </p>
                 <small className={productId.inStock ?"green-font":"red-font"}>{productId.inStock ? "InStock":"OutOfStock"}</small>
               </div> 
 
               <div className="center">
                     <div className="cd-increment-decrement-btns">
                           <div className="icon-sm secondary-bg" onClick={()=>decrementCartItemOnServerFn(dispatch,userId,productId._id,qty)}>
                                 <i className="fas fa-minus fa-1x white-font minus"></i>
                           </div>
 
                           {/* item quantity in cart  */}
                           <p>{qty}</p>
 
                           <div className="icon-sm secondary-bg" onClick={()=>incrementCartItemOnServerFn(dispatch,userId,productId._id,qty)}>
                                   <i className="fas fa-plus fa-1x white-font plus"></i>
                           </div><br/>
                     </div>
 
      
                     <div className="btn secondary-bg"
                           onClick={()=>moveCartItemToWishListOnServerFn(dispatch,userId,productId._id,productId)}
                           >MOVE TO WISHLIST
                     </div>
                     <br/>
               </div>
         </div>
     </div>
   )}
 
 
 
 
     {/* cart total bill division */}
       <div className="bill-section ">
             <div className="wide-row bold bottom-border">Cart Items  ({cartLength})</div>
             <div className="wide-row"><div>Cart Total </div> ₹{cartValue*(1-discount)}</div>
             <div className="wide-row">GST<div>₹{gst}</div> </div>
             <div className="wide-row  bottom-border">Shipping Charges <div>{shippingCharges==="FREE" ? <span style={{color:"green"}}>FREE DELIVERY</span> : <span>₹50</span>}</div> </div>
             <div className="wide-row bold ">TOTAL <div>₹{total}</div> </div> 
             <div className="btn primary-bg "   >Place Order Bro</div>
       </div>
 </section>
 
}

export function CartItemsDontExist(){
      const navigate= useNavigate()
return <>
      <div className="empty-bin ">
             <h1 className="primary-font">Creators cart</h1>
            <h3>"what brooooooo... empty CART!!</h3>
            <p>Add something brooo... click the below button bro👇</p>
            <div className="btn secondary-bg "  onClick={()=>navigate("/products")} >Shop Today's Deals</div>

      </div>
</>
}