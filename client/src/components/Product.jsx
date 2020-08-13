import React, {useSate} from "react";
export default function Product({name, description, price, img, stock, cellarId, categoryId, strainId}){
    return(
    <div>
        <h1>{name}</h1>
        <h1>{description}</h1>
        <h1>{price}</h1>
        <h1>{stock}</h1>
        <img src="https://www.thecarycompany.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/3/0/30wgw5_1.1595231918.jpg"/>
    </div>);
}





