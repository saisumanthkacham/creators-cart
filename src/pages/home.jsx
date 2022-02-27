import { faSoap } from "@fortawesome/free-solid-svg-icons"
import { getDefaultNormalizer } from "@testing-library/dom"
import {useNavigate} from "react-router-dom"
import pic from "../images/homePic.svg"
import {useStateContext} from "./state-context.js"



export function Home(){
    const {dispatch}=useStateContext()
    const navigate=useNavigate()


    return <section className="home-page">
        
        <img className="home-img" src={pic} alt="illustration"/>
        <div className="home-text">

            <h1 className="bold">Creators Cart</h1>
            <p>  
                Welcome to Creators Cart , 
                this is the place to purchase the products of your favourite creator 
                from the platforms like Youtube, Instagram, Linkedin and  Twitter .You are on the 
                right platform to Grab the latest merchandise and other products of your favourite
                creator before anyone else on the whole Internet.
            </p><br/>
            <div className="btn white-font secondary-bg" onClick={()=>{navigate("/products");dispatch({type:"CLEAR-ALL-FILTERS"})}}>Shop Now</div>
                
        </div>
        
        <div className="home-categories">

            <h1>Shop by Platforms</h1><br/>

            <div className="wide-row white-font">
                <div  className="home-category-block primary-bg" onClick={()=>{dispatch({type:"CLEAR-ALL-FILTERS"});dispatch({type:"INSTAGRAM"});navigate("/products")}}><h3>instagram <i className="fab fa-instagram"></i></h3></div>
                <div className="home-category-block primary-bg" onClick={()=>{dispatch({type:"CLEAR-ALL-FILTERS"});dispatch({type:"YOUTUBE"});navigate("/products")}}><h3>Youtube <i className="fab fa-youtube"></i></h3></div><br/>
            </div>
            <div className="wide-row white-font">
                <div  className="home-category-block primary-bg" onClick={()=>{dispatch({type:"CLEAR-ALL-FILTERS"});dispatch({type:"LINKEDIN"});navigate("/products")}} ><h3>Linkedin <i className="fab fa-linkedin"></i></h3></div>
                <div className="home-category-block primary-bg" onClick={()=>{dispatch({type:"CLEAR-ALL-FILTERS"});dispatch({type:"TWITTER"});navigate("/products")}}><h3>Twitter <i className="fab fa-twitter"></i></h3></div><br/>
            </div>
       
        </div>

        <div className="home-footer white-font">
            <div><h3>made with ❤️ by Sai sumanth aka Namasthe Kaka </h3></div>
            
            <div className="wide-row wide-icons">
            <a href="https://www.linkedin.com/in/kacham-sai-sumanth-33a513176/"><i className="fab fa-linkedin fa-2x primary-font"></i></a>
            <a href="https://github.com/saisumanthkacham/creators-cart/tree/development"><i className="fab fa-github fa-2x primary-font"></i></a>
           
            <div>   <a href="https://github.com/saisumanthkacham/Dunzo-UI/tree/development"><i className="fab fa-github-alt fa-2x primary-font"></i></a></div>
            </div>

        </div>
       
    </section>}