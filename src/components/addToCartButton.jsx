import { addToCartOnServerFn } from "../apiCalls"
import { checkIfItemExistInCart } from "../pages/reducerFn"


export const AddToCartButton=({dispatch,userId,prodId,qty,state})=>{


    return (<>
   {checkIfItemExistInCart(state,{id:prodId})
                                    ?<div className="btn secondary-bg ">ADDED TO CART</div>
                                    :<div className="btn secondary-bg " onClick={()=>{addToCartOnServerFn(dispatch,userId,prodId,qty)}}>ADD TO CART</div>
   }
   

            
    </>)
}