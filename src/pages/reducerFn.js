

// functions which help to find if an item exists in a particlular query
export function checkIfItemExistInCart(state,item){
    return state.cart.some(it=>it.id===item.id) 
}

export function checkIfItemExistInWishList(state,item){
    return state.wishList.some(it=>it.id===item.id)
}


// reducer function
export function reducerFn(prevState,{type,payLoad}){
   
    switch(type){
        

        case "ADD-TO-CART":
            console.log("add to cart line no 21",payLoad)
           return checkIfItemExistInCart(prevState,payLoad)?{...prevState}:
            {...prevState,cart:[...prevState.cart,payLoad]}
        

        case "ADD-TO-WISHLIST":
            return checkIfItemExistInWishList(prevState,payLoad)?{...prevState}:
            {...prevState,wishList:[...prevState.wishList,payLoad]}


        // cart functionalities
        case "MOVE-TO-WISHLIST":
            
            return checkIfItemExistInWishList(prevState,payLoad) ? {...prevState} :
            {...prevState,wishList:[...prevState.wishList,{productId:payLoad}],cart:prevState.cart.filter(it=>it.productId._id!==payLoad.id)}

        case "INCREMENT-CART-ITEM": 
            return {...prevState,cart: prevState.cart.map(it=>it.productId._id===payLoad.id ? {...it,qty:it.qty+1}:it)}
        
        case "DECREMENT-CART-ITEM":
            return {...prevState,cart: prevState.cart.map(it=>it.productId._id===payLoad.id ? (it.qty>1 ? {...it,qty:it.qty-1}:it): it)}   

        case "DELETE-CART-ITEM":
            return {...prevState,cart: prevState.cart.filter(it=>it.productId._id!==payLoad.id)}


        //  wishList functionalities
        case "DELETE-WISHLIST-ITEM":
            return {...prevState,wishList: prevState.wishList.filter(it=>it.productId._id!==payLoad.id)}

        case "MOVE-TO-CART":
           
            return  checkIfItemExistInCart(prevState,{id:payLoad.product._id}) ? {...prevState} : 
            {...prevState,cart:[...prevState.cart,{productId:payLoad.product,qty:payLoad.qty}],wishList:prevState.wishList.filter(it=>it.productId._id!==payLoad.product._id)}

            
        // sort functionalities
        case "HIGH-TO-LOW":
            return {...prevState,data:prevState.data?.sort((a,b)=>b.price-a.price),dataFilteredByPlatforms:prevState.dataFilteredByPlatforms?.sort((a,b)=>b.price-a.price)}

        case "LOW-TO-HIGH":
            return {...prevState,data:prevState.data?.sort((a,b)=>a.price-b.price),dataFilteredByPlatforms:prevState.dataFilteredByPlatforms?.sort((a,b)=>a.price-b.price)}
        
        case "INSTAGRAM":
            return {...prevState,dataFilteredByPlatforms:prevState.data.filter(item=>item.platform==="instagram"),filters:{...prevState.filters, instagram:!prevState.filters.instagram}}
            
        case "TWITTER":
            return {...prevState,dataFilteredByPlatforms:prevState.data.filter(item=>item.platform==="Twitter"),filters:{...prevState.filters, twitter:!prevState.filters.twitter}}
    
        case "LINKEDIN":
            return {...prevState,dataFilteredByPlatforms:prevState.data.filter(item=>item.platform==="Linkedin"),filters:{...prevState.filters, linkedin:!prevState.filters.linkedin}}
    
        case "YOUTUBE":
            return {...prevState,dataFilteredByPlatforms:prevState.data.filter(item=>item.platform==="Youtube"),filters:{...prevState.filters, youtube:!prevState.filters.youtube}}


        // filter functionalities
        case "INCLUDE-OUT-OF-STOCK":
            return {...prevState,filters:{...prevState.filters, outOfStock:!prevState.filters.outOfStock}}

        case "ONLY-FAST-DELIVERY":
            return {...prevState,filters:{...prevState.filters,fastDelivery:!prevState.filters.fastDelivery}}

        case "CLEAR-ALL-FILTERS":
            return {...prevState,filters:
                            { outOfStock:false,
                              fastDelivery:false,
                              youtube:false,
                              instagram:false,
                              twitter:false,
                              linkedin:false}}
         // api calls

        case "GET-DATA-FROM-SERVER":
            return {...prevState,data:[...payLoad]}

        case "FETCH-CART-FROM-SERVER":
                return {...prevState,cart:[...payLoad]}

        case "FETCH-WISHLIST-FROM-SERVER":
            return {...prevState,wishList:[...payLoad]}

        default : return prevState
    }

    

    



}