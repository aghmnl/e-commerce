import {
    ADD_PRODUCT,
    EDIT_PRODUCT,
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
    GET_STRAIN

} from "../actions";

const initialState = {
    products :[],
    categories :[],
    strains :[],
    cellars :[],
    productDetail:{},
    purchased_products :[],
    statuses: [],
    users: [],
    pay_methods: [],
    purchases: [],
    reviews: [],
    total : 0 
}
export default (state = initialState, action) =>{
    switch(action.type){
        case ADD_PRODUCT:
            var {id, price} = action.product;
            var {purchased_products, total} = state;
            var index = purchased_products.findIndex(pp => pp.productId === id);
            if(index < 0) return {
                ...state,
                total : total + price,
                purchased_products: purchased_products.concat({productId: id, quantity: action.quantity , price: price})
            }
            purchased_products[index].quantity = purchased_products[index].quantity + action.quantity; 
            return {
                ...state,
                total : total + price * action.quantity,
                purchased_products
            };
         case  EDIT_PRODUCT:
            var {id, price} = action.product;
            var {purchased_products} = state;
            var index = state.purchased_products.findIndex(pp => pp.productId === id);
            var cantInicial = state.purchased_products[index].quantity;
            state.purchased_products[index].quantity = cantInicial + action.quantity; 
            return  {
                ...state,
                total : total + price * (action.quantity - cantInicial),
                purchased_products
            }
        case EMPTY_CART: 
            return {
                purchased_products : [],
                total : 0 
            }
        case DELETE_PRODUCT:
            var {id, price } = action.product;
            var {purchased_products} = state;
            var index = purchased_products.findIndex(pp => pp.productId === id);
            var totalProducto = purchased_products[index].quantity * purchased_products[index].price;

            return {
                ...state,
                purchased_products: purchased_products.filter( producto => producto.productId !== id ),
                total: state.total - totalProducto,
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products : action.payload
            }
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail : action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories : action.payload
            }
        case GET_CATEGORY:
            return {
                ...state,
                category : action.payload
            }
        case GET_CELLARS:
            return {
                ...state,
                cellars : action.payload
            }
        case GET_CELLAR:
            return {
                ...state,
                cellar : action.payload
            }
        case GET_STRAINS:
            return {
                ...state,
                strains : action.payload
            }
        case GET_STRAIN:
            return {
                ...state,
                strain : action.payload
            }
        case GET_STRAINS_BY:
            return {
                ...state,
                strains_by : action.payload
            }
        case SEARCH_PRODUCT:
                return {
                    ...state,
                    products : action.payload
                }
        case "CLEAN_PRODUCT" : return {...state, productDetail:{}}
        default: return {...state}

    }
}