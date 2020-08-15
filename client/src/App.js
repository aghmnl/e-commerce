import React, { useState, useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Catalogue from "./components/Catalogue";
import FormProduct from "./components/FormProduct";
import Product from "./components/Product";
import FormCategory from "./components/FormCategory";
import FormCellar from "./components/FormCellar";
import FormStrain from "./components/FormStrain";
import NavBar from "./components/NavBar";
function App() {
	const [products, setProducts] = useState([]);
	function filtrarProduct(id) {
		//fetch a la api
		return {};
	}
	function Getproductos(category) {
		const url = !category ? "http://localhost:3000/products" : `http://localhost:3000/products/category/${category}`;
		fetch(url)
			.then(r => r.json())
			.then(Products => {
				setProducts([...products, Products]);
			});
	}
	return (
		<div className="App">
			<Route path="/" render={() => <NavBar />} />
			<Route exact path="/catalogue/category/:categoryId" render={({ match }) => <Catalogue products={products} getproductos={Getproductos} category={match.params.categoryId} />} />
			<Route exact path="/catalogue" render={() => <Catalogue products={products} getproductos={Getproductos} category={null} />} />
			<Route exact path="/admin/formProduct" component={FormProduct} />
			<Route exact path="/admin/formCategory" component={FormCategory} />
			<Route exact path="/admin/formCellar" component={FormCellar} />
			<Route exact path="/admin/formStrain" component={FormStrain} />
			<Route exact path="/product/:id" render={({ match }) => <Product id={match.params.id} filtrarProduct={filtrarProduct} />} />
		</div>
	);
}

export default App;
