import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {connect, useDispatch} from "react-redux";
import {getCategories, getCatalogue, getProducts, cleanCatalogue, searchProduct} from "../store/actions/index";
import {Nav,Spinner} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import "../styles/Catalogue.css";
function Catalogue({ 
	category, 
	products, 
	categories, 
	getCatalogue,
	cleanCatalogue,
	getCategories, 
	getProducts,
	searchProduct,
	pag, 
	pags
}) {
	const location = useLocation();
	useEffect(() => {
		if(!pag) return;
		getCatalogue(pag);
		return () =>{
			cleanCatalogue();
		}
	}, [pag]);
	useEffect(() => {
		if(!category) return;
		getProducts(category);
	}, [category]);
	useEffect(() =>{
		getCategories();
	},[])
	useEffect(()=>{
		if(!location.search) return;
		const searchParams = new URLSearchParams(location.search);
		searchProduct(searchParams.get("search"));
	},[location])
	return (
		<div>
			<Nav id="navegacion" activeKey="/catalogue/category/1">
				<Nav.Item>
				<Nav.Link><NavLink to="/catalogue/0">Todos</NavLink></Nav.Link>
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
					{
						!!products?products.map(product => (
							<ProductCard id={product.id} name={product.name} price={product.price} cellar={product.cellar} img={product.img} />
						)):(() =>{
							setInterval(()=>{
								return "Catalogo vacio"
							},1000)
							return (<Spinner animation="border" />);
						})()
					}
					{
						(()=>{
							if(!products) return;
							let buttons = [];
							for(let i=0;i<=Math.floor(pags/4);i++){
								buttons.push((<NavLink to={"/catalogue/"+i}>{i}</NavLink>))
							}
							return buttons.map(button => button);
						})()
					}
				</div>
			</div>
		</div>
	);
}
export default connect(({catalogue, products, categories}) =>{
	return {
		pags : catalogue.count,
		products : !Object.values(catalogue).length?products:catalogue.rows,
		categories : categories
	}
},{
	getCategories, 
	getCatalogue,
	cleanCatalogue,
	getProducts,
	searchProduct
})(Catalogue)
