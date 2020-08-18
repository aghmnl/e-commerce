import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
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
					<NavLink to="/catalogue"><Nav.Link>Todos</Nav.Link></NavLink>
				</Nav.Item>
				{categories.map(category => (
					<Nav.Item>
						<NavLink to={`/catalogue/category/${category.id}`}>
							<Nav.Link>{category.name}</Nav.Link>
						</NavLink>
					</Nav.Item>
				))}
			</Nav>
			<div className="row">
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
