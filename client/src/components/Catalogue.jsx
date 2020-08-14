import React from "react";
import ProductCard from "./ProductCard";

export default function Catalogue({products}){
    return(
    <div>
       {products.map(({name, price})=> <ProductCard name={name} price={price}/>)}
    </div>
    );
}





