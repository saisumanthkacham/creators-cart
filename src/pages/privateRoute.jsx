import {Navigate,Route} from "react-router-dom"
import {useStateContext} from "./state-context.js"


export function PrivateRoute({path,...props}){
   const {login}= useStateContext()
    // we are adding replace prop here to avoid looping on auth route i.e, it removes previous path from route history
    return login?<Route path={path} {...props}/>:<Navigate state={{fromPath:path}} replace to="/login"/>

}