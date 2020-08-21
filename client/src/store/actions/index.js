export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const EMPTY_CART = "EMPTY_CART";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const INCRESE_PRODUCT = "INCERSE_PRODUCT";
export const DECRESE_PRODUCT = "DECERSE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CATEGORY = "GET_CATEGORY";
export const GET_CELLARS = "GET_CELLARS";
export const GET_CELLAR = "GET_CELLAR";
export const GET_STRAINS = "GET_STRAINS";
export const GET_STRAIN = "GET_STRAIN";
export const GET_STRAINS_BY = "GET_STRAINS_BY";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";
export const cleanProduct = () => ({
        type : "CLEAN_PRODUCT",
})
export const getProducts = (categoryId) => {
        return (dispatch) => {
                const url = !categoryId?"http://localhost:3000/product":`http://localhost:3000/product/category/${categoryId}`;
		return fetch(url)
			.then(r => r.json())
                        .then(products => dispatch({type: GET_PRODUCTS, payload: products}))
                        .catch(err => console.log(err))
        }
}
export const getProduct = (id) =>{
        return (dispatch) => {
                const url = `http://localhost:3000/product/detail/${id}`;
		return fetch(url)
			.then(r => r.json())
                        .then(product => dispatch({type: GET_PRODUCT_DETAIL, payload: product}))
                        .catch(err => console.log(err))
        }
}
export const getCategories = () => {
        return (dispatch) => {
                const url = "http://localhost:3000/category";
		return fetch(url)
			.then(r => r.json())
                        .then(categories => dispatch({type: GET_CATEGORIES, payload: categories}))
                        .catch(err => console.log(err))
        }
}
export const getCategory = (id) => {
        return (dispatch) => {
                const url = "http://localhost:3000/category/one/"+id;
		return fetch(url)
			.then(r => r.json())
                        .then(category => dispatch({type: GET_CATEGORY, payload: category}))
                        .catch(err => console.log(err))
        }
}
export const getCellars = () => {
        return (dispatch) => {
                const url = "http://localhost:3000/cellar";
		return fetch(url)
			.then(r => r.json())
                        .then(cellars => dispatch({type: GET_CELLARS, payload: cellars}))
                        .catch(err => console.log(err))
        }
}
export const getCellar = (id) => {
        return (dispatch) => {
                const url = "http://localhost:3000/cellar/one/"+id;
		return fetch(url)
			.then(r => r.json())
                        .then(cellar => dispatch({type: GET_CELLAR, payload: cellar}))
                        .catch(err => console.log(err))
        }
}
export const getStrains = () => {
        return (dispatch) => {
                const url = "http://localhost:3000/strain";
		return fetch(url)
			.then(r => r.json())
                        .then(strains => dispatch({type: GET_STRAINS, payload: strains}))
                        .catch(err => console.log(err))
        }
}
export const getStrain = (id) => {
        return (dispatch) => {
                const url = "http://localhost:3000/strain/one/"+id;
		return fetch(url)
			.then(r => r.json())
                        .then(strain => dispatch({type: GET_STRAIN, payload: strain}))
                        .catch(err => console.log(err))
        }
}
export const getStrainsBy = (categoryId) => {
        return (dispatch) => {
                const url = "http://localhost:3000/strain/category/"+categoryId;
		return fetch(url)
			.then(r => r.json())
                        .then(strains => dispatch({type: GET_STRAINS_BY, payload: strains}))
                        .catch(err => console.log(err))
        }
}
export const searchProduct = (query) => {
        return (dispatch) => {
                const url = "http://localhost:3000/product/search?query="+query;
		return fetch(url)
			.then(r => r.json())
                        .then(products => dispatch({type: SEARCH_PRODUCT, payload: products}))
                        .catch(err => console.log(err))
        }
}
export const addProduct = (product, quantity) => ({
    type: ADD_PRODUCT,
    product : product,
    quantity : parseInt(quantity),
})
export const increseProduct = (product) => ({
        type: INCRESE_PRODUCT,
        product : product,
})
export const decreseProduct = (product) => ({
        type: DECRESE_PRODUCT,
        product : product,
})
export const deleteProduct = (product) => {
	return {
        type: DELETE_PRODUCT,
        product
	};
}

export const editProduct = (product, quantity) => {
	return {
        type: EDIT_PRODUCT,
        product,
        quantity
	};
}

export const emptyCart = () => {
	return {
		type: EMPTY_CART,
	};
}

export const getUsers = () => {
        return (dispatch) => {
                const url = "http://localhost:3000/user";
		return fetch(url)
			.then(r => r.json())
                        .then(users => dispatch({type: GET_USERS, payload: users}))
                        .catch(err => console.log(err))
        }
}
export const getUser = (id) => {
        return (dispatch) => {
                const url = "http://localhost:3000/user/"+id;
		return fetch(url)
			.then(r => r.json())
                        .then(user => dispatch({type: GET_USER, payload: user}))
                        .catch(err => console.log(err))
        }
}
