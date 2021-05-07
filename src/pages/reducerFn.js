

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
        
        // here null values are to be replaced with some snackbars or modals and dynamic name changing to these conditions on button are also should be applied

        case "ADD-TO-CART":
           return checkIfItemExistInCart(prevState,payLoad)?{...prevState}:
            {...prevState,cart:[...prevState.cart,payLoad]}

        case "ADD-TO-WISHLIST":
            return checkIfItemExistInWishList(prevState,payLoad)?{...prevState}:
            {...prevState,wishList:[...prevState.wishList,payLoad]}


        // cart functionalities
        case "MOVE-TO-WISHLIST":
            return checkIfItemExistInWishList(prevState,payLoad) ? {...prevState} :
            {...prevState,wishList:[...prevState.wishList,payLoad],cart:prevState.cart.filter(it=>it.id!==payLoad.id)}

        case "INCREMENT-IN-CART":                         
            return {...prevState,cart: prevState.cart.map(it=>it.id===payLoad.id ? {...it,qty:it.qty+1}:it)}
        
        case "DECREMENT-IN-CART":
            return {...prevState,cart: prevState.cart.map(it=>it.id===payLoad.id 
            ? (it.qty>1 ? {...it,qty:it.qty-1}:it)
            : it
            )}   

        case "DELETE-IN-CART":
            return {...prevState,cart: prevState.cart.filter(it=>it.id!==payLoad.id)}


        //  wishList functionalities
        case "DELETE-FROM-WISHLIST":
            return {...prevState,wishList: prevState.wishList.filter(it=>it.id!==payLoad.id)}

        case "MOVE-TO-CART":
            return  checkIfItemExistInCart(prevState,payLoad) ? {...prevState} : 
            {...prevState,cart:[...prevState.cart,payLoad],wishList:prevState.wishList.filter(it=>it.id!==payLoad.id)}

            
        // sort functionalities
        case "HIGH-TO-LOW":
            return {...prevState,data:prevState.data.sort((a,b)=>b.price-a.price)}

        case "LOW-TO-HIGH":
            return {...prevState,data:prevState.data.sort((a,b)=>a.price-b.price)}


        // filter functionalities
        case "INCLUDE-OUT-OF-STOCK":
            return {...prevState,outOfStock:!prevState.outOfStock}

        case "ONLY-FAST-DELIVERY":
            return {...prevState,fastDelivery:!prevState.fastDelivery}

        default : return prevState
    }

    

    



}