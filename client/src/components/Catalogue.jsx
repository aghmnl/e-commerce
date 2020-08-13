import React from "react";
import ProductCard from "./ProductCard";

export default function Catalogue({products}){
    return(
    <div>
       {products.forEach(({name, price})=> <ProductCard name={name} price={price}/>)}
    </div>
    );
}





