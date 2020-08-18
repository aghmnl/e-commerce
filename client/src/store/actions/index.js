export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const EMPTY_CART = "EMPTY_CART";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

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


