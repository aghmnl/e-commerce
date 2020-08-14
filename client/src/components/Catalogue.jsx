import React from "react";
import ProductCard from "./ProductCard";

export default function Catalogue({ products }) {
	return (
		<div>
			{products.map(({id, name, price }) => (
				<ProductCard id={id} name={name} price={price} />
			))}
		</div>
	);
}
