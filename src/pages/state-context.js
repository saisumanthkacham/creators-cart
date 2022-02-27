import { createContext, useContext,useReducer,useState } from "react";
import {reducerFn} from "./reducerFn"
import { useEffect } from 'react';
import {GetDataFromServerFn} from "../apiCalls.js"
const StateContext=createContext()


export function StateProvider({children}){

    const intialState={
        cart:[],
        wishList:[],
        data:[],
        filteredDataByPlatforms:[],
        filters:{ 
            outOfStock:false,
            fastDelivery:false,
            youtube:false,
            instagram:false,
            twitter:false,
            linkedin:false
        }
       
    }

    const[state,dispatch]=useReducer(reducerFn,intialState)
    const[login,setLogin]=useState()
    
    // calling reducer function here since it should be inside the state provider
    reducerFn(state,dispatch)
    // we have to get user data from server
    const userId="60b1020e9e6d1500fa3f251c"

    useEffect(()=>{GetDataFromServerFn(dispatch)},[])



    // this dependency of useeffect should be changed 
    // const cartLen=state.cart.length 
    // useEffect(()=>{fetchCartFromServerFn(dispatch,userId)},[cartLen])   
    // console.log("cart data from state context ",{cart:state.cart}) 

   

return <StateContext.Provider value={{state,dispatch,login,setLogin,userId}}>
        {children}
       </StateContext.Provider>

}

// creating the custom hook using the use context api
export function useStateContext()
{
    return useContext(StateContext)
}


