export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const EMPTY_CART = "EMPTY_CART";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const getProducts = () => {
        return (dispatch) => {
                const url = "http://localhost:3000/product";
		return fetch(url)
			.then(r => r.json())
                        .then(products => ({type: GET_PRODUCTS, payload: products}))
                        .catch(err => console.log(err))
        }
}
export const getProduct = (id) =>{
        return (dispatch) => {
                const url = `http://localhost:3000/product/${id}`;
		return fetch(url)
			.then(r => r.json())
                        .then(product => ({type: GET_PRODUCT_DETAIL, payload: product}))
                        .catch(err => console.log(err))
        }
}
export const addProduct = (product, quantity) => ({
    type: ADD_PRODUCT,
    product : product,
    quantity : parseInt(quantity),
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


