import axios from 'axios'

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const EMPTY_CART = 'EMPTY_CART'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const INCRESE_PRODUCT = 'INCERSE_PRODUCT'
export const DECRESE_PRODUCT = 'DECERSE_PRODUCT'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORY = 'GET_CATEGORY'
export const GET_CELLARS = 'GET_CELLARS'
export const GET_CELLAR = 'GET_CELLAR'
export const GET_STRAINS = 'GET_STRAINS'
export const GET_STRAIN = 'GET_STRAIN'
export const GET_STRAINS_BY = 'GET_STRAINS_BY'
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const GET_USERS = 'GET_USERS'
export const GET_USER = 'GET_USER'
export const GET_PURCHASES = 'GET_PURCHASES'
export const GET_PURCHASE = 'GET_PURCHASE'
export const GET_STATUSES = 'GET_STATUSES'
export const GET_CATALOGUE = 'GET_CATALOGUE'
export const IS_ADMIN = 'IS_ADMIN'
export const IS_AUTH = 'IS_AUTH'
export const SET_CART = 'SET_CART'
export const GET_CART_ITEMS = 'GET_CART_ITEMS'
export const GET_MY_PURCHASES = 'GET_MY_PURCHASES'
export const GET_MY_PURCHASE = 'GET_MY_PURCHASE'
export const SET_IS_ADMIN = 'SET_IS_ADMIN'
export const SET_COOKIES_SHOWN = 'SET_COOKIES_SHOWN'

export const setCookiesShown = () => ({
	type: SET_COOKIES_SHOWN,
})

export const cleanProduct = () => ({
	type: 'CLEAN_PRODUCT',
})
export const cleanCatalogue = () => ({
	type: 'CLEAN_CATALOGUE',
})
export const cleanUser = () => ({
	type: 'CLEAN_USER',
})
export const cleanCellar = () => ({
	type: 'CLEAN_CELLAR',
})
export const cleanCategory = () => ({
	type: 'CLEAN_CATEGORY',
})
export const cleanStrain = () => ({
	type: 'CLEAN_STRAIN',
})
export const getProducts = (categoryId, strains = []) => {
	return (dispatch) => {
		const url = !categoryId
			? 'http://localhost:3001/product_public'
			: `http://localhost:3001/product_public/category/${categoryId}`
		if (!strains.length)
			return axios
				.get(url, { withCredentials: true })
				.then(({ data: products }) =>
					dispatch({ type: GET_PRODUCTS, payload: products })
				)
				.catch((err) => console.log(err))
		axios
			.post('http://localhost:3001/product_public/strains', {
				strains: strains,
				categoryId: categoryId,
			})
			.then(({ data: products }) =>
				dispatch({ type: GET_PRODUCTS, payload: products })
			)
			.catch((err) => console.log(err))
	}
}
export const setUserInfo = (user) => ({
	type: 'SET_USER_INFO',
	payload: user,
})
export const isAuth = () => {
	return (dispatch) => {
		const url = 'http://localhost:3001/auth/isauth'
		return axios
			.get(url, { withCredentials: true })
			.then(({ data }) => dispatch({ type: IS_AUTH, payload: data.isAuth }))
			.catch((err) => console.log(err))
	}
}
export const isAdmin = () => {
	return (dispatch) => {
		const url = 'http://localhost:3001/auth/isadmin'
		return axios
			.get(url, { withCredentials: true })
			.then(({ data }) => dispatch({ type: IS_ADMIN, payload: data }))
			.catch((err) => console.log(err))
	}
}

export const setIsAdmin = (isAdmin) => ({
	type: SET_IS_ADMIN,
	payload: isAdmin,
})

export const getCatalogue = (pag) => {
	return (dispatch) => {
		const url = `http://localhost:3001/product_public/catalogue?pag=${pag}`
		return fetch(url)
			.then((r) => r.json())
			.then((products) =>
				dispatch({ type: GET_CATALOGUE, payload: products })
			)
			.catch((err) => console.log(err))
	}
}
export const getProduct = (id) => {
	return (dispatch) => {
		const url = `http://localhost:3001/product_public/detail/${id}`

		return fetch(url)
			.then((r) => r.json())
			.then((product) =>
				dispatch({ type: GET_PRODUCT_DETAIL, payload: product })
			)
			.catch((err) => console.log(err))
	}
}
export const getCategories = () => {
	return (dispatch) => {
		const url = 'http://localhost:3001/category_public'
		return axios
			.get(url, { withCredentials: true })
			.then(({ data }) => dispatch({ type: GET_CATEGORIES, payload: data }))
			.catch((err) => console.log(err))
	}
}
export const getCategory = (id) => {
	return (dispatch) => {
		const url = 'http://localhost:3001/category_private/one/' + id
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: category }) =>
				dispatch({ type: GET_CATEGORY, payload: category })
			)
			.catch((err) => console.log(err))
	}
}
export const getCellars = () => {
	return (dispatch) => {
		const url = 'http://localhost:3001/cellar_public'
		return fetch(url)
			.then((r) => r.json())
			.then((cellars) => dispatch({ type: GET_CELLARS, payload: cellars }))
			.catch((err) => console.log(err))
	}
}
export const getCellar = (id) => {
	return (dispatch) => {
		const url = 'http://localhost:3001/cellar_private/one/' + id
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: cellar }) =>
				dispatch({ type: GET_CELLAR, payload: cellar })
			)
			.catch((err) => console.log(err))
	}
}
export const getStrains = () => {
	return (dispatch) => {
		const url = 'http://localhost:3001/strain_public'
		return fetch(url)
			.then((r) => r.json())
			.then((strains) => dispatch({ type: GET_STRAINS, payload: strains }))
			.catch((err) => console.log(err))
	}
}
export const getStrain = (id) => {
	return (dispatch) => {
		const url = 'http://localhost:3001/strain_private/one/' + id
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: strain }) =>
				dispatch({ type: GET_STRAIN, payload: strain })
			)
			.catch((err) => console.log(err))
	}
}
export const getStrainsBy = (categoryId) => {
	return (dispatch) => {
		const url = 'http://localhost:3001/strain_public/category/' + categoryId
		return fetch(url)
			.then((r) => r.json())
			.then((strains) =>
				dispatch({ type: GET_STRAINS_BY, payload: strains })
			)
			.catch((err) => console.log(err))
	}
}
export const searchProduct = (query) => {
	return (dispatch) => {
		const url = 'http://localhost:3001/product_public/search?query=' + query
		return fetch(url)
			.then((r) => r.json())
			.then((products) =>
				dispatch({ type: SEARCH_PRODUCT, payload: products })
			)
			.catch((err) => console.log(err))
	}
}

export const addProduct = (product) => ({
	type: ADD_PRODUCT,
	product: product,
})
export const increseProduct = (product) => ({
	type: INCRESE_PRODUCT,
	product: product,
})
export const decreseProduct = (product) => ({
	type: DECRESE_PRODUCT,
	product: product,
})
export const deleteProduct = (product) => {
	return {
		type: DELETE_PRODUCT,
		product,
	}
}

export const editProduct = (product, quantity) => {
	return {
		type: EDIT_PRODUCT,
		product,
		quantity,
	}
}

export const emptyCart = () => {
	return {
		type: EMPTY_CART,
	}
}

export const getUsers = () => {
	return (dispatch) => {
		const url = 'http://localhost:3001/user_private'
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: users }) =>
				dispatch({ type: GET_USERS, payload: users })
			)
			.catch((err) => console.log(err))
	}
}
export const getUser = (id) => {
	return (dispatch) => {
		const url = 'http://localhost:3001/user_private/' + id
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: user }) => dispatch({ type: GET_USER, payload: user }))
			.catch((err) => console.log(err))
	}
}
export const setCart = (cartId) => {
	return {
		type: SET_CART,
		payload: cartId,
	}
}
export const getCartItems = (cartId) => {
	return (dispatch) => {
		const url =
			'http://localhost:3001/purchased_products_protected/cart_items/' +
			cartId
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: cart_items }) =>
				dispatch({ type: GET_CART_ITEMS, payload: cart_items })
			)
			.catch((err) => console.log(err))
	}
}
export const getPurchases = (statusId) => {
	return (dispatch) => {
		const url = !statusId
			? 'http://localhost:3001/purchase_private'
			: `http://localhost:3001/purchase_private/status?statusId=${statusId}`
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: purchases }) =>
				dispatch({ type: GET_PURCHASES, payload: purchases })
			)
			.catch((err) => console.log(err))
	}
}
export const getMyPurchase = (id) => {
	// console.log('Llama a getMyPurchase (action)')
	return (dispatch) => {
		const url = `http://localhost:3001/purchase_protected/detail/${id}`
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: purchase }) =>
				dispatch({ type: GET_MY_PURCHASE, payload: purchase })
			)
			.catch((err) => console.log(err))
	}
}
export const getPurchase = (id) => {
	console.log('Llama a getPurchase (action)')
	return (dispatch) => {
		const url = `http://localhost:3001/purchase_private/detail/${id}`
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: purchase }) =>
				dispatch({ type: GET_PURCHASE, payload: purchase })
			)
			.catch((err) => console.log(err))
	}
}
export const getMyPurchases = () => {
	return (dispatch) => {
		const url = 'http://localhost:3001/purchase_protected/my_purchases'
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: purchases }) =>
				dispatch({ type: GET_MY_PURCHASES, payload: purchases })
			)
			.catch((err) => console.log(err))
	}
}
export const getStatuses = () => {
	return (dispatch) => {
		const url = 'http://localhost:3001/status_private'
		return axios
			.get(url, { withCredentials: true })
			.then(({ data: statuses }) =>
				dispatch({ type: GET_STATUSES, payload: statuses })
			)
			.catch((err) => console.log(err))
	}
}
