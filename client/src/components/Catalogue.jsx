import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Nav from "react-bootstrap/Nav";
import "../styles/Catalogue.css";
export default function Catalogue({ products, getProductos, category, getCategories, categories }) {
	useEffect(() => {
		getCategories();
		getProductos(category);
	}, []);

	return (
		<div>
			<Nav id="navegacion" activeKey="/catalogue/category/1">
				<Nav.Item>
					<Nav.Link href="/catalogue/">Todos</Nav.Link>
				</Nav.Item>
				{categories.map(category => (
					<Nav.Item>
						<Nav.Link href={`/catalogue/category/${category.id}`}>{category.name}</Nav.Link>
					</Nav.Item>
				))}
			</Nav>
			<div className="row" style={{ overflow: "scroll" }}>
				<div className="col-2">
					{/* Acá va a selececcionar las cepas
					<Form>
						{["checkbox"].map(type => (
							<div key={`default-${type}`} className="mb-3">
								<Form.Check type={type} id={`default-${type}`} label={`default ${type}`} />
							</div>
						))}
					</Form> */}
				</div>
				<div className="col-10 catalogue">
					{products.map(product => (
						<ProductCard id={product.id} name={product.name} price={product.price} cellar={product.cellar} img={product.img} />
					))}
				</div>
			</div>
		</div>
	);
}
