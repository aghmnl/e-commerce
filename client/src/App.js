import React, { useState, useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Catalogue from "./components/Catalogue";
import FormProduct from "./components/FormProduct";
import Product from "./components/Product";
import FormCategory from "./components/FormCategory";
import FormCellar from "./components/FormCellar";
import FormStrain from "./components/FormStrain";
import FormUser from "./components/FormUser";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import CarouselSlider from "./components/CarouselSlider";
import {
	getCategories,
	getProducts,
	getStrains,
	getCellars,
	searchProduct,
	getUsers,
	getPurchases,
} from "./store/actions/index";
import Admin from "./components/Admin";
import Purchases from "./components/Purchases";
import { connect } from "react-redux";
import Cart from "./components/Cart";
function App({ getProducts, getCategories, getStrains, getCellars, searchProduct, getUsers, getPurchases }) {
	return (
		<div className="App">
			<Route path="/" render={() => <NavBar cb={searchProduct} />} />
			<Route exact path="/" component={Home} />
			<Route exact path="/" component={CarouselSlider} />
			<Route path="/admin" component={Admin} />
			<Route path="/admin/purchases/" component={Purchases} />
			<Route exact path="/cart" component={Cart} />
			<Route
				exact
				path="/catalogue/category/:categoryId"
				render={({ match }) => <Catalogue category={match.params.categoryId} />}
			/>
			<Route exact path="/catalogue/:pag" render={({ match }) => <Catalogue pag={match.params.pag} />} />

			<Route exact path="/catalogue" render={() => <Catalogue />} />
			<Route exact path="/admin/formProduct" component={FormProduct} />
			<Route exact path="/admin/formProduct/edit/:id" render={({ match }) => <FormProduct id={match.params.id} />} />
			<Route exact path="/admin/formCategory" render={() => <FormCategory />} />
			<Route
				exact
				path="/admin/formCategory/edit/:id"
				render={({ match }) => <FormCategory id={match.params.id} edit={true} />}
			/>
			<Route exact path="/admin/formCellar" render={() => <FormCellar />} />
			<Route
				exact
				path="/admin/formCellar/edit/:id"
				render={({ match }) => <FormCellar id={match.params.id} edit={true} />}
			/>
			<Route exact path="/admin/formStrain" render={() => <FormStrain />} />

			<Route
				exact
				path="/admin/formStrain/edit/:id"
				render={({ match }) => <FormStrain id={match.params.id} edit={true} />}
			/>

			<Route exact path="/product/:id" render={({ match }) => <Product id={match.params.id} />} />

			<Route exact path="/admin/formUser" render={() => <FormUser />} />
			<Route
				exact
				path="/admin/formUser/edit/:id"
				render={({ match }) => <FormUser id={match.params.id} edit={true} />}
			/>
		</div>
	);
}
export default connect(null, {
	getCategories,
	getProducts,
	getStrains,
	getCellars,
	getUsers,
	searchProduct,
	getPurchases,
})(App);
