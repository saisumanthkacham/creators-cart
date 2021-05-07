
import './index.css';
import {ProductPage} from "./pages/productsPage/productPage.jsx"
import {ProductsListing} from "./pages/productsPage/productListing.jsx"
import {Product} from "./pages/productsPage/product.jsx"
import {Cart} from "./pages/cart.jsx"
import {WishList} from "./pages/wishList.jsx"
import {Error} from "./pages/error.jsx"
import {Auth} from "./pages/auth.jsx"
import {Home} from "./pages/home.jsx"
import {useStateContext} from "./pages/state-context.js"
import {PrivateRoute} from "./pages/privateRoute.jsx"
import { Routes,Route,NavLink,useNavigate} from 'react-router-dom';


function App() {
  // hooks
  const{state,dispatch,login,setLogin}= useStateContext()
  const navigate=useNavigate()

  function logOutHandler(){
    setLogin(false)
    localStorage.setItem("login",JSON.stringify({login:false}))
    navigate("/")
  }

  return (
    <div className="App">
    
     {/* sorting ka buttons */}
     <input type="radio" name="sort" id="" onClick={()=>dispatch({type:"HIGH-TO-LOW"})}/>
     <label>HIGH-TO-LOW</label>
     <input type="radio" name="sort" id="" onClick={()=>dispatch({type:"LOW-TO-HIGH"})}/>
     <label>LOW-TO-HIGH</label>

      {/* filters  */}
      <br/>
      <input type="checkbox" checked={state.outOfStock} onChange={()=>dispatch({type:"INCLUDE-OUT-OF-STOCK"})} />
      <label>INCLUDE-OUT-OF-STOCK</label><br/>
      <input type="checkbox" checked={state.fastDelivery} onChange={()=>dispatch({type:"ONLY-FAST-DELIVERY"})} />
      <label>FAST-DELIVERY</label>
      <br/>

      &nbsp;
      <NavLink to="/"  end     activeClassName="active-btn" className="btn" >Home</NavLink>&nbsp;
      <NavLink to="/products"  activeClassName="active-btn" className="btn" >products</NavLink>&nbsp;
      <NavLink to="/cart"      activeClassName="active-btn" className="btn" >cart</NavLink>&nbsp;
      <NavLink to="/WishList"  activeClassName="active-btn" className="btn" >wishList</NavLink>
    
      {login &&<button onClick={()=>{logOutHandler()}}  className="btn">logout</button>}

      <Routes>
      <Route  path="/" element={<Home/>}/>
        <Route  path="/products" element={<ProductPage/>}>
            <Route  path="/" element={<ProductsListing/>}/>
            <Route  path="/:id" element={<Product/>}/>
        </Route>
        <PrivateRoute path="/cart" element={<Cart/>}/>
        <PrivateRoute path="/WishList" element={<WishList/>}/>
        <Route path="*" element={<Error/>}/>
        <Route  path="/auth" element={<Auth/>}/>
      </Routes>

    </div>
  );
}

export default App;
