import React from "react";
import ProductCard from "./ProductCard";

export default function Catalogue(props){
    return(
    <div>
       {props.forEach((element)=>{
           <ProductCard product={element}/>
       })}
    </div>
    );
}





