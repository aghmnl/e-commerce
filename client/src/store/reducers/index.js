import {
	ADD_PRODUCT,
	EDIT_PRODUCT,
	INCRESE_PRODUCT,
	DECRESE_PRODUCT,
	EMPTY_CART,
	DELETE_PRODUCT,
	GET_PRODUCTS,
	GET_PRODUCT_DETAIL,
	GET_CATEGORIES,
	GET_CELLARS,
	GET_STRAINS,
	GET_STRAINS_BY,
	SEARCH_PRODUCT,
	GET_CATEGORY,
	GET_CELLAR,
	GET_STRAIN,
	GET_USERS,
	GET_USER,
	GET_CATALOGUE,
	GET_PURCHASES,
	GET_STATUSES,
	SET_CART,
	GET_CART_ITEMS,
	IS_ADMIN,
	IS_AUTH,
	GET_MY_PURCHASES,
	GET_PURCHASE,
	SET_IS_ADMIN,
} from "../actions";
import axios from "axios";
const initialState = {
	products: [],
	catalogue: {},
	categories: [],
	strains: [],
	cellars: [],
	productDetail: {},
	purchased_products: [],
	statuses: [],
	users: [],
	pay_methods: [],
	purchases: [],
	reviews: [],
	total: 0,
	logged: false,
	admin: false,
};
export default (state = initialState, action) => {
	switch (action.type) {
		// Agrega 1 producto al carrito desde el detalle del producto, tanto al estado como a la DB
		case ADD_PRODUCT:
			var { id, price, name, img, stock } = action.product;
			var { purchased_products, total } = state;
			var index = purchased_products.findIndex(pp => pp.id === id);
			if (index < 0) {
				state = {
					...state,
					total: total + price,
					purchased_products: purchased_products.concat({
						id: id,
						quantity: 1,
						price: price,
						img,
						name,
						stock,
					}),
				};
			} else {
				purchased_products[index].quantity++;
				state = {
					...state,
					total: total + price,
					purchased_products,
				};
			}
			return state;

		case INCRESE_PRODUCT:
			var { id, price, stock } = action.product;
			var { purchased_products, total } = state;
			var index = purchased_products.findIndex(pp => pp.id === id);
			// Verifica si el usuario está logueado para sumarlo también en la base de datos.
			if (state.logged) {
				axios
					.post(
						"http://localhost:3001/purchased_products_protected/increase_product",
						{
							cartId: state.cartId,
							id,
						},
						{ withCredentials: true }
					)
					.then(res => console.log(res.data))
					.catch(err => console.log(err.response));
			}
			purchased_products[index].quantity += 1;
			return {
				...state,
				total: total + parseInt(price),
				purchased_products,
			};
		case DECRESE_PRODUCT:
			var { id, price } = action.product;
			var { purchased_products, total } = state;
			var index = purchased_products.findIndex(pp => pp.id === id);
			// Verifica si el usuario está logueado para sumarlo también en la base de datos.
			if (state.logged) {
				axios
					.post(
						"http://localhost:3001/purchased_products_protected/decrease_product",
						{
							cartId: state.cartId,
							id,
						},
						{ withCredentials: true }
					)
					.then(res => console.log(res.data))
					.catch(err => console.log(err.response));
			}
			purchased_products[index].quantity -= 1;
			return {
				...state,
				total: total - parseInt(price),
				purchased_products,
			};
		case EDIT_PRODUCT:
			var { id, price } = action.product;
			var { purchased_products } = state;
			var index = state.purchased_products.findIndex(pp => pp.id === id);
			var cantInicial = state.purchased_products[index].quantity;
			state.purchased_products[index].quantity = cantInicial + action.quantity;
			return {
				...state,
				total: total + price * (action.quantity - cantInicial),
				purchased_products,
			};
		case EMPTY_CART:
			if (state.logged) {
				axios
					.delete("http://localhost:3001/purchased_products_protected/empty_cart/" + state.cartId, {
						withCredentials: true,
					})
					.then(res => console.log(res))
					.catch(err => console.log(err));
			}
			return {
				...state,
				purchased_products: [],
				total: 0,
			};
		case DELETE_PRODUCT:
			var { id, price } = action.product;
			var { purchased_products } = state;
			var index = purchased_products.findIndex(pp => pp.id === id);
			var totalProducto = purchased_products[index].quantity * purchased_products[index].price;
			if (state.logged) {
				axios
					.put(
						"http://localhost:3001/purchased_products_protected/delete_product/",
						{
							cartId: state.cartId,
							productId: id,
						},
						{ withCredentials: true }
					)
					.then(res => console.log(res))
					.catch(err => console.log(err));
			}
			return {
				...state,
				purchased_products: purchased_products.filter(producto => producto.id !== id),
				total: state.total - totalProducto,
			};
		case GET_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};
		case GET_CATALOGUE:
			return {
				...state,
				catalogue: action.payload,
			};
		case GET_PRODUCT_DETAIL:
			return {
				...state,
				productDetail: action.payload,
			};
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case GET_CATEGORY:
			return {
				...state,
				category: action.payload,
			};
		case GET_CELLARS:
			return {
				...state,
				cellars: action.payload,
			};
		case GET_CELLAR:
			return {
				...state,
				cellar: action.payload,
			};
		case GET_STRAINS:
			return {
				...state,
				strains: action.payload,
			};
		case GET_STRAIN:
			return {
				...state,
				strain: action.payload,
			};
		case GET_STRAINS_BY:
			return {
				...state,
				strains_by: action.payload,
			};
		case SEARCH_PRODUCT:
			return {
				...state,
				products: action.payload,
			};
		case GET_USERS:
			return {
				...state,
				users: action.payload,
			};
		case GET_USER:
			return {
				...state,
				user: action.payload,
			};
		case GET_STATUSES:
			return {
				...state,
				statuses: action.payload,
			};
		case GET_PURCHASES:
			return {
				...state,
				purchases: action.payload,
			};
		case GET_PURCHASE:
			return {
				...state,
				purchaseDetail: { ...action.payload.purchase, total: action.payload.total },
			};
		case SET_CART:
			return {
				...state,
				cartId: action.payload,
			};
		case GET_CART_ITEMS:
			return {
				...state,
				purchased_products: action.payload.cart_items,
				total: action.payload.total,
			};
		case GET_MY_PURCHASES:
			return {
				...state,
				my_purchases: action.payload,
			};
		case IS_AUTH:
			return {
				...state,
				logged: action.payload,
			};
		case IS_ADMIN:
			return {
				...state,
				admin: action.payload,
			};
        case "SET_USER_INFO":
			return{
				...state,
				user_info: action.payload.data
			}
		case "CLEAN_PRODUCT":
			return { ...state, productDetail: {} };
		case "CLEAN_CATALOGUE":
			return { ...state, catalogue: {} };

		case "CLEAN_USER":
			return { ...state, user: {} };
		case "CLEAN_CELLAR":
			return { ...state, cellar: {} };
		case "CLEAN_CATEGORY":
			return { ...state, category: {} };
		case "CLEAN_STRAIN":
			return { ...state, strain: {} };
		case SET_IS_ADMIN:
			return { ...state, admin: action.payload };
		default:
			return { ...state };
	}
};
