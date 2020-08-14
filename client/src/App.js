import React, { useState, useEffect} from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Catalogue from "./components/Catalogue";
import FormProduct from "./components/FormProduct";
import Product from "./components/Product";
import FormCategory from "./components/FormCategory";
import NavBar from "./components/NavBar";
function App() {
	const [products, setProducts] = useState([])
	function filtrarProduct(id) {
		//fetch a la api
		return {};
	}
	useEffect(()=>{
		const url = "http://localhost:3000/products";
		fetch(url).then(r => r.json())
		.then(Products =>{
			setProducts([...products, Products]);
		})
	},[]);
	function getProductCards() {
		//fetch a la api
		//retorna array
		
		return products;
	}

	// function Getproductos (){
	// 	fethc -->llamada a la api
	// 	.then(){
	// 		return rta;
	// 	}
	// }
	return (
		<div className="App">
			<Route path="/" render={() => <NavBar />} />
			<Route exact path="/catalogue" render={() => <Catalogue products={products} />} />
			<Route exact path="/admin/formProduct" component={FormProduct} />
			<Route exact path="/admin/formCategory" component={FormCategory} />
			<Route exact path="/product/:id" render={({ match }) => <Product id={match.params.id} filtrarProduct={filtrarProduct} />} />
		</div>
	);
}

export default App;
