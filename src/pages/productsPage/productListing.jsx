
import {useStateContext} from "../state-context"
import {NavLink} from "react-router-dom"
import {addToCartApiFn} from "../../apiCalls"

export function ProductsListing(){
    
    const {state,dispatch}=useStateContext()
    
    let filteredData=({outOfStock,fastDelivery,data})=>{
        return data
         .filter(item=>(outOfStock?item:item.inStock))
         .filter(item=>(fastDelivery?item.fastDelivery:item))}
  
    const getFiltered= filteredData(state)
  
    return <div className="products">
    {getFiltered.map((prod)=>(
      <div key={prod.id} className="card border">
        <img src={prod.image} alt="" className="image"/> 
       <NavLink to={`/products/${prod.id}`} activeClassName="active-name-link" className="name-link" > <h3>{prod.pName}</h3></NavLink>
        <div>₹{prod.price}</div>
        <div>{prod.material}</div>
        {prod.inStock ? <div>inStock</div>:<div>OutOfStock</div>}
        {prod.fastDelivery ? <div>fastDelivery</div>:<div></div>}
        <div>Rating:{prod.ratings}</div>
       
        {/* <button onClick={()=>dispatch({type:"ADD-TO-CART",payLoad:prod})}>ADD TO CART</button> */}

        <button onClick={(dispatch)=>addToCartApiFn(prod,dispatch)}>ADD TO CART</button>
        <button onClick={()=>dispatch({type:"ADD-TO-WISHLIST",payLoad:prod})}>ADD TO WISHLIST</button>
  
      </div>
    )
    )}
    </div>
  }
  