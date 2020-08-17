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
import Home from "./components/Home";
import CarouselSlider from "./components/CarouselSlider";
import Admin from "./components/Admin";

export default function App() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [cellars, setCellars] = useState([]);
	const [strains, setStrains] = useState([]);
	function filtrarProduct(id) {
		let producto = products.filter(product => product.id === parseInt(id));
		return producto[0];
	}
	function filtrarCellar(id) {
		let bodegas = cellars.filter(cellar => cellar.id === parseInt(id));
		return bodegas[0];
	}
	function filtrarCategory(id) {
		let categorias = categories.filter(category => category.id === parseInt(id));
		return categorias[0];
	}
	function filtrarStrain(id) {
		let cepas = strains.filter(strain => strain.id === parseInt(id));
		return cepas[0];
	}

	function getProductos(category) {
		const url = "http://localhost:3000/product";
		fetch(url)
			.then(r => r.json())
			.then(products => {
				if (!category) return setProducts(products);
				const productsCategory = products.filter(
					product => product.categoryId === parseInt(category)
				);
				setProducts(productsCategory);
			});
	}
	function SearchProductos(query) {
		const url = "http://localhost:3000/product/search?query="+query;
		fetch(url)
			.then(r => r.json())
			.then(products => {
				setProducts(products);
			});
	}
	function getCategories() {
		fetch("http://localhost:3000/category")
			.then(r => r.json())
			.then(categories => {
				setCategories(categories);
			});
	}
	function getCellars() {
		fetch("http://localhost:3000/cellar")
			.then(r => r.json())
			.then(cellars => {
				setCellars(cellars);
			});
	}
	function getStrains(category) {
		fetch("http://localhost:3000/strain")
			.then(r => r.json())
			.then(strains => {
				const strainsCat = strains.filter(strain => strain.categoryId === parseInt(category));
				if (!category) return setStrains(strains);
				setStrains(strainsCat);
			});
	}
	return (
		<div className="App">
			<Route path="/" render={() => <NavBar cb={SearchProductos} />} />
      <Route exact path="/" render={() => <Home categories={categories} getCategories={getCategories}/>} />
			<Route exact path="/" render={() => <CarouselSlider products={products} getProductos={getProductos} />} />
  			
			<Route path="/admin" render={() => <Admin />} />
			<Route
				exact
				path="/catalogue/category/:categoryId"
				render={({ match }) => (
					<Catalogue
						products={products}
						getProductos={getProductos}
						category={match.params.categoryId}
						getCategories={getCategories}
						categories={categories}
					/>
				)}
			/>
		
  
  <Route
				exact
				path="/catalogue"
				render={() => (
					<Catalogue
						products={products}
						getProductos={getProductos}
						category={null}
						getCategories={getCategories}
						categories={categories}
					/>
				)}
			/>


			<Route
				exact
				path="/admin/formProduct"
				render={() => (
					<FormProduct
						products={products}
						getProductos={getProductos}
						getCategories={getCategories}
						getCellars={getCellars}
						getStrains={getStrains}
						categories={categories}
						cellars={cellars}
						strains={strains}
						filtrarProduct={null}
						id={null}
						edit={false}
					/>
				)}
			/>
			<Route
				exact
				path="/admin/formProduct/edit/:id"
				render={({ match }) => (
					<FormProduct
						products={products}
						getProductos={getProductos}
						filtrarProduct={filtrarProduct}
						getProductos={getProductos}
						getCategories={getCategories}
						getCellars={getCellars}
						getStrains={getStrains}
						categories={categories}
						cellars={cellars}
						strains={strains}
						id={match.params.id}
						edit={true}
					/>
				)}
			/>
			<Route
				exact
				path="/admin/formCategory"
				render={() => (
					<FormCategory
						getCategories={getCategories}
						categories={categories}
						filtrarCategory={null}
						id={null}
						edit={false}
					/>
				)}
			/>
			<Route
				exact
				path="/admin/formCategory/edit/:id"
				render={({ match }) => (
					<FormCategory
						getCategories={getCategories}
						categories={categories}
						filtrarCategory={filtrarCategory}
						id={match.params.id}
						edit={true}
					/>
				)}
			/>
			<Route
				exact
				path="/admin/formCellar"
				render={() => (
					<FormCellar
						cellars={cellars}
						getCellars={getCellars}
						filtrarCellar={null}
						id={null}
						edit={false}
					/>
				)}
			/>
			<Route
				exact
				path="/admin/formCellar/edit/:id"
				render={({ match }) => (
					<FormCellar
						cellars={cellars}
						getCellars={getCellars}
						filtrarCellar={filtrarCellar}
						id={match.params.id}
						edit={true}
					/>
				)}
			/>
			<Route
				exact
				path="/admin/formStrain"
				render={() => (
					<FormStrain
						getStrains={getStrains}
						getCategories={getCategories}
						categories={categories}
						strains={strains}
						filtrarStrain={null}
						id={null}
						edit={false}
					/>
				)}
			/>

			<Route
				exact
				path="/admin/formStrain/edit/:id"
				render={({ match }) => (
					<FormStrain
						getStrains={getStrains}
						getCategories={getCategories}
						categories={categories}
						strains={strains}
						filtrarStrain={filtrarStrain}
						id={match.params.id}
						edit={true}
					/>
				)}
			/>

			<Route
				exact
				path="/product/:id"
				render={({ match }) => <Product id={match.params.id} filtrarProduct={filtrarProduct} />}
			/>
		</div>
	);
}
