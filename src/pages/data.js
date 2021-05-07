
import faker, { seed } from 'faker';

// import { useEffect,useState } from "react";
// import axios from 'axios'
faker.seed(123)
export const data= [...Array(50)].map(item=>({
  pName:faker.commerce.productName(),
  id:faker.datatype.uuid(),
  image:faker.random.image(),
  price:faker.commerce.price(),
  material:faker.commerce.productMaterial(),
  inStock:faker.datatype.boolean(),
  fastDelivery:faker.datatype.boolean(),
  color:faker.commerce.color(),
  ratings: faker.random.arrayElement([1,2,3,4,5]),
  
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    
  ]),
  qty:1,
  
}))
// function FetchData(){
//   const [data,setData]=useState()
// (async ()=> {
//   console.log("entered the function")
//   try{
//     await axios.get("https://ecom-api.sumanth5234.repl.co/data").then(({data})=>setData(data))
  
//   console.log("inside the func",data)
//   return data;

//   }
//   catch(err){
//     console.log(err)
//   }
 
// })()
// }

// export const data= FetchData()
// console.log("outside the func",data)

 



