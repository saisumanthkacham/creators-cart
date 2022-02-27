import { addToWishListOnServerFn,deleteWishListItemOnServerFn } from "../apiCalls"
import { checkIfItemExistInWishList } from "../pages/reducerFn"

export const WishListButton=({dispatch,userId,prodId,state})=>{


    return (<>
    {console.log("ifItemExists and prod",checkIfItemExistInWishList(state,{id:prodId}))}
    {checkIfItemExistInWishList(state,{id:prodId})
                                    ?<i onClick={()=>deleteWishListItemOnServerFn(dispatch,userId,prodId)} className="fas fa-heart fa-lg cd-icon red-font"></i>
                                    :<i onClick={()=>addToWishListOnServerFn(dispatch,userId,prodId)} className="fas fa-heart fa-lg cd-icon white-font"></i>
    
    }

            
    </>)
}