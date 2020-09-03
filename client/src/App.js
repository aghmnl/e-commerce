import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Catalogue from "./components/Catalogue";
import FormProduct from "./components/FormProduct";
import Product from "./components/Product";
import FormCategory from "./components/FormCategory";
import FormCellar from "./components/FormCellar";
import FormStrain from "./components/FormStrain";
import FormUser from "./components/FormUser";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import CarouselSlider from "./components/CarouselSlider";
import { getPurchases, isAuth, isAdmin,  } from "./store/actions/index";
import Admin from "./components/Admin";
import FormPurchase from "./components/FormPurchase";
import { connect } from "react-redux";
import Cart from "./components/Cart";
import User from "./components/User";
import Mypurchases from "./components/MyPurchases";
import Reset from "./components/Reset";
import Register from "./components/Register";
import Purchase from "./components/Purchase";
import { saveCart, saveTotal } from "./store/localState";
import store from "./store/index";
import FormReview from "./components/FormReview";
import Settings from "./components/Settings";
import Checkout from "./components/Checkout";
store.subscribe(() => {
	const { purchased_products, total } = store.getState();
	saveCart(purchased_products);
	saveTotal(total);
});
function App({ getPurchases, isAuth, isAdmin, getCart }) {
	useEffect(() => {
		isAuth();
		isAdmin();
		getPurchases();
	}, []);
	return (
		<div className="App">
			<Route path="/" render={() => <NavBar />} />
			<Route exact path="/" component={Home} />
			<Route exact path="/settings" component={Settings} />
			<Route exact path="/" component={CarouselSlider} />
			<Route path="/admin" component={Admin} />
			<Route exact path="/admin/formPurchase" component={FormPurchase} />
			<Route
				exact
				path="/admin/formPurchase/status/:statusId"
				render={({ match }) => <FormPurchase statusId={match.params.statusId} />}
			/>

			<Route exact path="/cart" component={Cart} />
			<Route
				exact
				path="/catalogue/category/:categoryId"
				render={({ match }) => <Catalogue category={match.params.categoryId} />}
			/>
			<Route path="/catalogue?search" component={Catalogue} />
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
			<Route exact path="/formReview/:product" render={({ match }) => <FormReview product={match.params.product} />} />
			<Route exact path="/admin/formUser" render={() => <FormUser />} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/user" component={User} />
			<Route exact path="/reset" component={Reset} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/user/purchases" component={Mypurchases} />
			<Route exact path="/admin/purchase/:id" render={({ match }) => <Purchase id={match.params.id} />} />
			<Route exact path="/checkout" render={()=> <Checkout/>}/>
		</div>
	);
}
export default connect(null, {
	getPurchases,
	isAuth,
	isAdmin,
})(App);
