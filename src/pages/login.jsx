import {useStateContext} from "./state-context.js"
import {useLocation,useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import { toast } from "react-toastify"


export function Login(){
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
        response?.login&&navigate("/login")
        response?.login&&toast.info(`Hey, you are successfully logged in!! `,{position:"bottom-right"})
        console.log("response",response)
    },[])

    function loginHandler(userName,password,user){

        if((user.userName===userName)&&(user.password===password))
        {
        setLogin(true);
        localStorage.setItem("login",JSON.stringify({login:true}));
        navigate(state?.fromPath?state.fromPath:"/");
        toast.info(`Hey, ${userName} you are successfully logged in!! `,{position:"bottom-right"})
        }
        else{
            console.log("wrong username or password")
            toast.error(`Wrong username and password `,{position:"bottom-right"})

        }
    }
   
return(<>
    <div className="login-page">
       
        <h1 className="primary-font">Creators cart</h1>
        <p>please login your account bro</p>
       <input className="input-box" placeholder="username"  onChange={(event)=>setUserName(event.target.value)} type="text" /><br/>
        <input className="input-box" placeholder="password" onChange={(event)=>setPassword(event.target.value)}  type="password" /><br/>
       <div className="login-btn primary-bg " onClick={()=>loginHandler(userName,password,userCred)}>login</div>
        <small><div to="/signup" onClick={()=>loginHandler("admin","admin",userCred)} className="login-btn  primary-font secondary-bg" >Login with test credentials</div></small>
     
       
    </div>
    
    </>)

}