import {useStateContext} from "./state-context.js"
import {useLocation,useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
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
        response?.login&&navigate("/")
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
    <div className="login-page">
       
        <h1 className="primary-font">Creators cart</h1>
        <p>please login your account bro</p>
       <input className="input-box" placeholder="username"  onChange={(event)=>setUserName(event.target.value)} type="text" /><br/>
        <input className="input-box" placeholder="password" onChange={(event)=>setPassword(event.target.value)}  type="password" /><br/>
       <div className="btn btn-lg primary-bg " onClick={()=>loginHandler(userName,password,userCred)}>login</div>
       <div className="wide-row">
            <small>Forgot password?</small> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <small ><NavLink to="/signup"  activeClassName="active-btn" className="btn primary-font" >Signup</NavLink></small>
       </div>
       
    </div>
    
    </>)

}