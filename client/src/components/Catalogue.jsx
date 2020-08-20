import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {connect, useDispatch} from "react-redux";
import {getCategories, getProducts} from "../store/actions/index";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import "../styles/Catalogue.css";
function Catalogue({ category, products, categories, getProducts, getCategories}) {
	useEffect(() => {
		async function fetchData(){
			await getProducts(category);
		}
		fetchData();
	}, [category]);
	useEffect(() =>{
		async function fetchData(){
			await getCategories();
		}
		fetchData();
		return () =>{
			
		}
	},[])
	return (
		<div>
			<Nav id="navegacion" activeKey="/catalogue/category/1">
				<Nav.Item>
				<Nav.Link><NavLink to="/catalogue">Todos</NavLink></Nav.Link>
				</Nav.Item>
				{categories.map(category => (
					<Nav.Item>
						<Nav.Link>
						<NavLink to={`/catalogue/category/${category.id}`}>
							{category.name}
						</NavLink>
						</Nav.Link>
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
export default connect((state) =>{
	return {
		products : state.products,
		categories : state.categories
	}
},{getCategories,getProducts})(Catalogue)
