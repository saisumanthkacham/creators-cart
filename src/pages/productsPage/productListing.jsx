
import {useStateContext} from "../state-context"
import {NavLink} from "react-router-dom"
import {addToCartOnServerFn,addToWishListOnServerFn} from "../../apiCalls"

export function ProductsListing(){
    
    const {state,dispatch,userId}=useStateContext()
    
    let filteredData=({outOfStock,fastDelivery,data})=>{
        return data
         .filter(item=>(outOfStock?item:item.inStock))
         .filter(item=>(fastDelivery?item.fastDelivery:item))}
  
    const getFiltered= filteredData(state)
    const qty=1;
    return <div className="products">
    {getFiltered.map((prod)=>(
      <div key={prod._id} className="card border">
        <img src={prod.image} alt="" className="image"/> 
       <NavLink to={`/products/${prod._id}`} activeClassName="active-name-link" className="name-link" > <h3>{prod.pName}</h3></NavLink>
        <div>₹{prod.price}</div>
        {prod.inStock ? <div>inStock</div>:<div>OutOfStock</div>}
        {prod.fastDelivery ? <div>fastDelivery</div>:<div></div>}
       
        <button onClick={(dispatch)=>addToCartOnServerFn(dispatch,userId,prod._id,qty)}>ADD TO CART</button>
        <button onClick={(dispatch)=>addToWishListOnServerFn(dispatch,userId,prod._id)}>ADD TO WISHLIST</button>
  
      </div>
    )
    )}
    </div>
  }
  