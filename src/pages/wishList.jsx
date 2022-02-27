
import {useStateContext} from "./state-context.js"
import {fetchWishListFromServerFn,
        deleteWishListItemOnServerFn,
        moveWishListItemToCartOnServerFn} from "../apiCalls.js"
import {useEffect} from "react"
import {NavLink,useNavigate} from "react-router-dom"

export function WishList(){
   const {state,dispatch,userId}=useStateContext()
   useEffect(()=>fetchWishListFromServerFn(dispatch,userId),[])
   
return <div>
      
      {state.wishList.length>0 ?<WishListItemsExist/>:<WishListItemsDontExist/>}
  
</div>

}




export function WishListItemsExist(){

   const {state,dispatch,userId}=useStateContext()
   const qty=1;
   const discount=0.25;


   return <>
<div className="productsListing wishList">
   
   {state.wishList.map(({productId})=> 
   <div key={productId._id} className="cd">

         <img src={productId.image} alt="" className="cd-img"/> 

         <div className="cd-delete-icon"
            onClick={()=>deleteWishListItemOnServerFn(dispatch,userId,productId._id)}
            ><i className="fas fa-times fa-1x black-font"></i>
         </div>

         <div className="cd-info">
            <NavLink to={`/products/${productId._id}`} activeClassName="active-name-link" className="name-link" > <h3>{productId.pName}</h3></NavLink>
            <p>{productId.price*(1-discount)}<s className="grey-font"> ₹{productId.price}</s> <span className="green-font">({discount*100}%Off)</span> </p>
            <div className="btn secondary-bg " aria-disabled={productId.inStock} onClick={()=>{moveWishListItemToCartOnServerFn(dispatch,userId,productId._id,productId,qty)}}>MOVE TO CART</div> 
         </div>
   </div>
   )}
</div>
   
</>
}

export function WishListItemsDontExist(){
   const navigate= useNavigate()
   return <>
       <div className="empty-bin ">
            <h3 className="bottom-border">what brooooooo... empty WishList!!</h3>
            <p>add something brooo... click the below button 👇</p>
            <div className="btn secondary-bg "  onClick={()=>navigate("/products")} >Shop Today's Deals</div>

      </div>
   
   </>
}