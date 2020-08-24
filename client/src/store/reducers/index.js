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
} from "../actions";

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
};
export default (state = initialState, action) => {
	switch (action.type) {
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
			//purchased_products[index].quantity = purchased_products[index].quantity + action.quantity;
			return {
				...state,
			};
		case INCRESE_PRODUCT:
			var { id, price, stock } = action.product;
			var { purchased_products, total } = state;
			var index = purchased_products.findIndex(pp => pp.id === id);
			purchased_products[index].quantity = purchased_products[index].quantity + 1;
			return {
				...state,
				total: total + price,
				purchased_products,
			};
		case DECRESE_PRODUCT:
			var { id, price } = action.product;
			var { purchased_products, total } = state;
			var index = purchased_products.findIndex(pp => pp.id === id);
			purchased_products[index].quantity = purchased_products[index].quantity - 1;
			return {
				...state,
				total: total - price,
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
		default:
			return { ...state };
	}
};
