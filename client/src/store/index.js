import { createStore, applyMiddleware, compose } from 'redux'
import store from './reducers'
import thunk from 'redux-thunk'
import { loadCart, loadTotal } from './localState'
const total = loadTotal()
const cart = loadCart()
const initialState = {
	products: [],
	catalogue: {},
	categories: [],
	strains: [],
	cellars: [],
	productDetail: {},
	purchased_products: cart,
	statuses: [],
	users: [],
	pay_methods: [],
	purchases: [],
	reviews: [],
	users: [],
	total,
	cookiesShown: JSON.parse(localStorage.getItem('cookiesShown')) || false,
}
console.log('Mostrar consentimiento de cookies: ', initialState.cookiesShown)
const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose
export default createStore(
	store,
	initialState,
	composeEnhancers(applyMiddleware(thunk))
)
