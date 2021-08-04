
import './index.css';

import{
        ProductPage,ProductsListing,Product,Cart,WishList,Login,Error,Home,PrivateRoute,Signup,User,
      } from "./pages/indexPage.js"
import { Routes,Route,NavLink,useNavigate} from 'react-router-dom';
import {ToastContainer} from "react-toastify"


function App() {
  // hooks
  const navigate=useNavigate()

  


  return (
    <div className="App ">

      {/* navbar */}
      <nav className="nav">
        
        <div className="white-font nav-logo" onClick={()=>{navigate("/")}}>Creators Cart</div>
        <div >
          <NavLink to="/"  end     activeClassName="active-btn" className="btn bold" >Home</NavLink>&nbsp;
          <NavLink to="/products"  activeClassName="active-btn" className="btn bold" >Products</NavLink>&nbsp;
         
        </div>
        <div>
          <NavLink to="/cart"      activeClassName="active-btn" className="btn" ><i className="fas fa-shopping-cart text-sm"></i></NavLink>&nbsp;
          <NavLink to="/wishList"  activeClassName="active-btn" className="btn" ><i className="fas fa-heart text-sm"></i></NavLink>
          <NavLink to="/user"  activeClassName="active-btn" className="btn" ><i className="fas fa-user text-sm "></i></NavLink>
          <a href="https://github.com/saisumanthkacham"  className="btn"><i class="fab fa-github text-sm"></i></a>
          
        </div>
      </nav>

     

      <Routes>
      <Route  path="/" element={<Home/>}/>
        <Route  path="/products" element={<ProductPage/>}>
            <Route  path="/" element={<ProductsListing/>}/>
            <Route  path="/:id" element={<Product/>}/>
        </Route>
        <PrivateRoute path="/cart" element={<Cart/>}/>
        <PrivateRoute path="/wishList" element={<WishList/>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/signup" element={<Signup/>}/>
        <PrivateRoute  path="/user" element={<User/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>

     <ToastContainer/>

    </div>

  );
}

export default App;
