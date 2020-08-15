import React from "react";
import ProductCard from "./ProductCard";

export default function Catalogue({ products }) {
	// ATENCIÓN ESTO ES HARDCODEO
	var products = [
		{ id: 15, name: "Vino bueno", price: 15000, cellar: "Bodegas mendocinas", img: "https://i.ibb.co/jhJXXRv/Botella-vino-1.jpg" },
		{ id: 16, name: "El mejor vino", price: 15000, cellar: "Bodegas sanjuaninas", img: "https://i.ibb.co/jhJXXRv/Botella-vino-1.jpg" },
	];

	// FIN HARDCODEO

	return (
		<div>
			{products.map(({ id, name, price, cellar, img }) => (
				<ProductCard id={id} name={name} price={price} cellar={cellar} img={img} />
			))}
		</div>
	);
}
