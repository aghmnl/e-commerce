import React, { useState, useEffect } from 'react'
import './App.css'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Catalogue from './components/Catalogue'
import FormProduct from './components/FormProduct'
import Product from './components/Product'
import FormCategory from './components/FormCategory'
import FormCellar from './components/FormCellar'
import FormStrain from './components/FormStrain'
import FormUser from './components/FormUser'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import CarouselSlider from './components/CarouselSlider'
import {
	getPurchases,
	isAuth,
	isAdmin,
	getCartItems,
	setCart,
	setUserInfo,
} from './store/actions/index'
import Admin from './components/Admin'
import FormPurchase from './components/FormPurchase'
import { connect, useSelector, useDispatch } from 'react-redux'
import Cart from './components/Cart'
import User from './components/User'
import Mypurchases from './components/MyPurchases'
import Reset from './components/Reset'
import Register from './components/Register'
import Purchase from './components/Purchase'
import { saveCart, saveTotal } from './store/localState'
import store from './store/index'
import FormReview from './components/FormReview'
import Settings from './components/Settings'
import Checkout from './components/Checkout'
import PurchaseDetail from './components/PurchaseDetail'
import axios from 'axios'
store.subscribe(() => {
	const { purchased_products, total, cookiesShown } = store.getState()
	saveCart(purchased_products)
	saveTotal(total)
	localStorage.setItem('cookiesShown', JSON.stringify(cookiesShown))
})
function ExternalLogin() {
	const setCartItems = async () => {
		return axios.post(
			'http://localhost:3001/purchased_products_protected/add_product',
			{
				cartId: cartId,
				cart_items: purchased_products,
			},
			{
				withCredentials: true,
			}
		)
	}
	const getUserInfo = () => {
		axios
			.get('http://localhost:3001/user/me', { withCredentials: true })
			.then((user) => dispatch(setUserInfo(user)))
			.catch((err) => console.error(err.response.data))
	}
	const getCartId = () => {
		axios
			.get('http://localhost:3001/purchase_protected/cart_id', {
				withCredentials: true,
			})
			.then((res) => dispatch(setCart(res.data.cartId)))
			.catch((err) => console.error(err.response.data))
	}
	const dispatch = useDispatch()
	const { cartId, purchased_products } = useSelector((state) => state)
	const history = useHistory()
	useEffect(() => {
		getUserInfo()
		getCartId()
		dispatch(isAuth())
		dispatch(isAdmin())
	}, [])
	useEffect(() => {
		if (!cartId) return
		if (!purchased_products) return
		setCartItems()
			.then(async () => {
				await dispatch(getCartItems(cartId))
				history.replace('/')
			})
			.catch((err) => console.error(err.response.data))
	}, [cartId])
	return <></>
}
function App({
	getPurchases,
	isAuth,
	isAdmin,
	getCartItems,
	setCart,
	setUserInfo,
	cartId,
	purchased_products,
}) {
	const getUserInfo = () => {
		axios
			.get('http://localhost:3001/user/me', { withCredentials: true })
			.then((user) => setUserInfo(user))
			.catch((err) => console.error(err.response.data))
	}
	const getCartId = () => {
		axios
			.get('http://localhost:3001/purchase_protected/cart_id', {
				withCredentials: true,
			})
			.then((res) => setCart(res.data.cartId))
			.catch((err) => console.error(err.response.data))
	}
	const setCartItems = async () => {
		return axios.post(
			'http://localhost:3001/purchased_products_protected/add_product',
			{
				cartId: cartId,
				cart_items: purchased_products,
			},
			{
				withCredentials: true,
			}
		)
	}
	useEffect(() => {
		getUserInfo()
		getCartId()
		isAuth()
		isAdmin()
		getPurchases()
	}, [])

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
				render={({ match }) => (
					<FormPurchase statusId={match.params.statusId} />
				)}
			/>

			<Route exact path="/cart" component={Cart} />
			<Route
				exact
				path="/catalogue/category/:categoryId"
				render={({ match }) => (
					<Catalogue category={match.params.categoryId} />
				)}
			/>
			<Route path="/catalogue?search" component={Catalogue} />
			<Route
				exact
				path="/catalogue/:pag"
				render={({ match }) => <Catalogue pag={match.params.pag} />}
			/>
			<Route exact path="/catalogue" render={() => <Catalogue />} />
			<Route exact path="/admin/formProduct" component={FormProduct} />
			<Route
				exact
				path="/admin/formProduct/edit/:id"
				render={({ match }) => <FormProduct id={match.params.id} />}
			/>
			<Route
				exact
				path="/admin/formCategory"
				render={() => <FormCategory />}
			/>
			<Route
				exact
				path="/admin/formCategory/edit/:id"
				render={({ match }) => (
					<FormCategory id={match.params.id} edit={true} />
				)}
			/>
			<Route exact path="/admin/formCellar" render={() => <FormCellar />} />
			<Route
				exact
				path="/admin/formCellar/edit/:id"
				render={({ match }) => (
					<FormCellar id={match.params.id} edit={true} />
				)}
			/>
			<Route exact path="/admin/formStrain" render={() => <FormStrain />} />

			<Route
				exact
				path="/admin/formStrain/edit/:id"
				render={({ match }) => (
					<FormStrain id={match.params.id} edit={true} />
				)}
			/>
			<Route exact path="/external_login" component={ExternalLogin} />
			<Route
				exact
				path="/product/:id"
				render={({ match }) => <Product id={match.params.id} />}
			/>
			<Route
				exact
				path="/formReview/:id"
				render={({ match }) => <FormReview id={match.params.id} />}
			/>
			<Route exact path="/admin/formUser" render={() => <FormUser />} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/user" component={User} />
			<Route exact path="/reset" component={Reset} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/user/purchases" component={Mypurchases} />
			<Route
				exact
				path="/user/purchase/:id"
				render={({ match }) => <PurchaseDetail id={match.params.id} />}
			/>
			<Route
				exact
				path="/admin/purchase/:id"
				render={({ match }) => <Purchase id={match.params.id} />}
			/>
			<Route exact path="/checkout" render={() => <Checkout />} />
		</div>
	)
}
export default connect(
	({ cartId, purchased_products }) => ({
		cartId,
		purchased_products,
	}),
	{
		getPurchases,
		getCartItems,
		isAuth,
		isAdmin,
		setCart,
		setUserInfo,
	}
)(App)
