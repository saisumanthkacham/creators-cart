
import { useParams } from "react-router"
import {useStateContext} from "../state-context.js"
import {addToCartOnServerFn} from "../../apiCalls"


export function Product(){
    const {id}=useParams()
    const {state,userId,dispatch} = useStateContext()
    const prod= state.data.find(item=>item._id===id)
    const qty=1;
    const discount=0.25
    return (<div>
    <br/>
    <div key={prod.id} className="product-page ">
   
      <img src={prod.image} alt="" className="product-img"/> 

      <div className="product-text">

          <h1>{prod.pName}</h1>{` from ${prod.creator}'s store`}
          <h2>{prod.price*(1-discount)}<s className="grey-font"> ₹{prod.price}</s> <span className="green-font">({discount*100}%Off)</span> </h2>
         
          {prod.inStock ? <div className="green-font">inStock</div>:<div className="red-font">OutOfStock</div>}
          {prod.fastDelivery ? <div>fastDelivery <i className="fas fa-shipping-fast"></i></div>:<div></div>}
          platform: {prod.platform}<br/>
          gender : {prod.idealFor} 
          <div className="btn secondary-bg " disabled={prod.inStock} onClick={()=>{addToCartOnServerFn(dispatch,userId,prod._id,qty)}}>ADD TO CART</div>

      </div>
       
    </div>
    </div>)
}

