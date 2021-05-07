import {useNavigate} from "react-router-dom"
export function Home(){
    const navigate=useNavigate()
    return <div>
        <h2>This is home page</h2>
        &nbsp;&nbsp;&nbsp;
        <button
        onClick={()=>navigate("/products")}
        >shop >></button>
    </div>
}