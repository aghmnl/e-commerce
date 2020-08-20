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
import {getCategories, getProducts, getStrains, getCellars, searchProduct} from "./store/actions/index";
import Admin from "./components/Admin";
import {connect} from "react-redux";

function App({getProducts, getCategories, getStrains, getCellars, searchProduct}) {
	useEffect(()=>{
		getProducts();
		getCategories();
		getStrains();
		getCellars();
	},[])
	return (
		<div className="App">
			<Route path="/" render={() => <NavBar cb={searchProduct} />} />
			<Route exact path="/" component={Home} />
			<Route exact path="/" component={CarouselSlider} />
			<Route path="/admin" component={Admin} />
			<Route
				exact
				path="/catalogue/category/:categoryId"
				render={({ match }) => (<Catalogue category={match.params.categoryId}/>)}
			/>
  			<Route
				exact
				path="/catalogue"
				render={() => (<Catalogue/>)}
			/>
			<Route
				exact
				path="/admin/formProduct"
				component={FormProduct}
			/>
			<Route
				exact
				path="/admin/formProduct/edit/:id"
				render={({ match }) => (
					<FormProduct id={match.params.id}/>
				)}
			/>
			<Route
				exact
				path="/admin/formCategory"
				render={() => (
					<FormCategory/>
				)}
			/>
			<Route
				exact
				path="/admin/formCategory/edit/:id"
				render={({ match }) => (
					<FormCategory
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
						
					/>
				)}
			/>
			<Route
				exact
				path="/admin/formCellar/edit/:id"
				render={({ match }) => (
					<FormCellar
						
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
						
					/>
				)}
			/>

			<Route
				exact
				path="/admin/formStrain/edit/:id"
				render={({ match }) => (
					<FormStrain
						
						id={match.params.id}
						edit={true}
					/>
				)}
			/>

			<Route
				exact
				path="/product/:id"
				render={({ match }) => <Product id={match.params.id}/>}
			/>
		</div>
	);
}
export default connect(null, 
	{
		getCategories, 
		getProducts, 
		getStrains, 
		getCellars,
		searchProduct
	})(App);
