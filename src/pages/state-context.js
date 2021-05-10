import { createContext, useContext,useReducer,useState } from "react";
import {reducerFn} from "./reducerFn"
import axios from "axios"
import { useEffect } from 'react';
import {fetchCartFromServerFn} from "../apiCalls.js"
const StateContext=createContext()


export function StateProvider({children}){

    const intialState={
        cart:[],
        wishList:[],
        data:[],
        outOfStock:false,
        fastDelivery:false
    }

    const[state,dispatch]=useReducer(reducerFn,intialState)
    const[login,setLogin]=useState()
    
    // passed values to reducer function here
    reducerFn(state,dispatch)

    // fetching intial data from server
    async function GetDataFromServerFn() {
        console.log("loading data from server")
    
    try{
        const {data}=await axios.get("https://ecom-api.sumanth5234.repl.co/data")
        dispatch({type:"GET-DATA-FROM-SERVER",payLoad:data})
        console.log("inside the func",data)
        }

    catch(err){
      console.log(err)
        }
   
    }

    useEffect(()=>{GetDataFromServerFn()},[])
    useEffect(()=>{fetchCartFromServerFn(dispatch)},[state.cart])    

return <StateContext.Provider value={{state,dispatch,login,setLogin}}>
        {children}
       </StateContext.Provider>

}

// creating the custom hook using the use context api
export function useStateContext()
{return useContext(StateContext)}


