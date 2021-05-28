
import { useParams } from "react-router"
import {useStateContext} from "../state-context.js"

export function Product(){
    const {id}=useParams()
    const {data} = useStateContext()
    const prod= data.find(item=>item.id===id)

    return (<>
    <div key={prod.id} className="card border">
      <img src={prod.image} alt="" className="image"/> 
       <h3>{prod.pName}</h3>
      <div>₹{prod.price}</div>
      <div>{prod.material}</div>
      {prod.inStock ? <div>inStock</div>:<div>OutOfStock</div>}
      {prod.fastDelivery ? <div>fastDelivery</div>:<div></div>}
      <div>Rating:{prod.ratings}</div>
    </div>
    </>)
}

