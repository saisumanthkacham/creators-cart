
import {useStateContext} from "../state-context"
import {NavLink} from "react-router-dom"
import { WishListButton } from "../../components/wishListButton";
import { AddToCartButton } from "../../components/addToCartButton";



export function ProductsListing(){
      const discount=0.25;
      const {state,dispatch,userId}=useStateContext()
    

      // filtering function logic
      let filteringData=({filters:{outOfStock,fastDelivery,instagram,youtube,twitter,linkedin},data,dataFilteredByPlatforms})=>{

        let dataToApplyFilterUpon
        
        if(instagram||youtube||twitter||linkedin){
          dataToApplyFilterUpon=dataFilteredByPlatforms;
        }
        else {
          dataToApplyFilterUpon=data
        }

        return dataToApplyFilterUpon
        .filter(item=>(outOfStock?item:item.inStock))
        .filter(item=>(fastDelivery?item.fastDelivery:item))}
          
        const filteredData= filteringData(state)
        const qty=1;



return <section className="body"> 


    {/* filters section in products page UI */}
    <section className="aside" >
    
      
        <div onClick={()=>dispatch({type:"CLEAR-ALL-FILTERS"})}className="btn secondary-bg ">
         Clear Filters
        </div>
          
       
        
        <br/>
        <hr/>

        <ul>
            <b>PLATFORMS</b><br/>
              <li> <input name="platform-sort" type="radio" checked={state.filters.youtube}  onChange={()=>{dispatch({type:"CLEAR-ALL-FILTERS"});dispatch({type:"YOUTUBE"})}} /><label>Youtube</label></li>
              <li><input name="platform-sort" type="radio" checked={state.filters.instagram}  onChange={()=>{dispatch({type:"CLEAR-ALL-FILTERS"});dispatch({type:"INSTAGRAM"})}} /><label>Instagram</label></li>
              <li><input name="platform-sort" type="radio"  checked={state.filters.linkedin} onChange={()=>{dispatch({type:"CLEAR-ALL-FILTERS"});dispatch({type:"LINKEDIN"})}} /><label>Linkedin</label></li>
              <li><input name="platform-sort" type="radio" checked={state.filters.twitter}  onChange={()=>{dispatch({type:"CLEAR-ALL-FILTERS"});dispatch({type:"TWITTER"})}} /><label>Twitter</label></li>
        </ul>
              <hr/>
        <ul>
            <b>PRICE</b><br/>
              <li><input type="radio" name="sort"  onClick={()=>dispatch({type:"HIGH-TO-LOW"})}/>
              <label>High to low</label></li>
              <li><input type="radio" name="sort"  onClick={()=>dispatch({type:"LOW-TO-HIGH"})}/>
              <label>Low to high</label></li>
        </ul>
              <hr/>
        <ul>
            <b>SORT</b><br/>
            <li><input type="checkbox" checked={state.filters.outOfStock} onChange={()=>dispatch({type:"INCLUDE-OUT-OF-STOCK"})}/><label>Include out of stock</label></li> 
            <li><input type="checkbox" checked={state.filters.fastDelivery} onChange={()=>dispatch({type:"ONLY-FAST-DELIVERY"})}/><label>FastDelivery</label></li>
            
        </ul>
              <hr/>

        <br/><br/><br/>👇<br/>
        <b>FUN FEATURE:</b><br/>  
        <div className="black-bg">
        <p className="primary-font">Wanna have some Fun, you can try editing text on this website by just clicking the below button </p>
        <div className=" btn grey-font" onClick={()=>document.designMode="on"}> Edit Website</div>
        <div className=" btn white-font" onClick={()=>document.designMode="off"}> stop editing</div><br/>
        </div>
        
    </section>






    {/* products listing section */}
    <section className="productsListing main">
        {filteredData.map((prod)=>(<div key={prod._id} className="cd">
            <div>
              <NavLink to={`/products/${prod._id}`}> <img src={prod.image} alt="" className="cd-img"/> </NavLink>
              <WishListButton dispatch={dispatch} userId={userId} prodId={prod._id} state={state} />
              {prod.inStock ? null:<div className="cd-badge black-bg orange-font">OutOfStock</div>}
            </div>
         
            <div className="cd-info">
              <NavLink to={`/products/${prod._id}`} activeClassName="active-name-link" className="name-link" > <h3>{prod.pName}</h3></NavLink>
              <p>{prod.price*(1-discount)}<s className="grey-font"> ₹{prod.price}</s> <span className="green-font">({discount*100}%Off)</span> </p>
              <AddToCartButton dispatch={dispatch} userId={userId} prodId={prod._id} qty={qty} state={state} />
            </div>
     
        </div>))}
    </section>



</section>
  }
  