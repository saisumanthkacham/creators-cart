import { createContext, useContext,useReducer,useState } from "react";
import {data} from "./data.js"
import {reducerFn} from "./reducerFn"
const StateContext=createContext()


export function StateProvider({children}){

    const intialState={
        cart:[],
        wishList:[],
        data,
        outOfStock:false,
        fastDelivery:false
    }

    const [state,dispatch]=useReducer(reducerFn,intialState)
    const[login,setLogin]=useState()
    
    // passed values to reducer function here
    reducerFn(state,dispatch)

return <StateContext.Provider value={{state,dispatch,login,setLogin}}>
        {children}
       </StateContext.Provider>

}


export function useStateContext()
{return useContext(StateContext)}


