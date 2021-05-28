import {useStateContext} from "./state-context.js"
import {useLocation,useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
export function Auth(){
    const {setLogin}= useStateContext()
    const {state}=useLocation()
    const navigate= useNavigate()
    const [userName,setUserName]=useState()
    const [password,setPassword]=useState()

    // you have to get these credentials from backend
    const userCred={userName:"admin",password:"admin"}

    useEffect(()=>{
        const response=JSON.parse(localStorage.getItem("login"))
        setLogin(response?.login&&response.login)
        navigate("/")
    },[])

    function loginHandler(userName,password,user){

        if((user.userName===userName)&&(user.password===password))
        {
        setLogin(true);
        localStorage.setItem("login",JSON.stringify({login:true}));
        navigate(state?.fromPath?state.fromPath:"/");
        }
        else{
            console.log("wrong password")
        }
    }
   
return(<>
    <div>

        username:<input  onChange={(event)=>{setUserName(event.target.value)}} type="text" /><br/>
        password:<input onChange={(event)=>{setPassword(event.target.value)}}  type="password" />
        <button onClick={()=>loginHandler(userName,password,userCred)}>login</button>
       
    </div>
    
    </>)

}