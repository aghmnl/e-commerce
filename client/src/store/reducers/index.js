import {
    ADD_PRODUCT,
    EDIT_PRODUCT,
    EMPTY_CART,
    DELETE_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT_DETAIL

} from "../actions";

const initialState = {
    products :[],
    categories :[],
    strains :[],
    cellars :[],
    productDetail:{},
    purchased_products :[],
    totaly : 0 
}
export default (state = initialState, action) =>{
    switch(action.type){
        case ADD_PRODUCT:
            var {id, price} = action.product;
            var {purchased_products, totaly} = state;
            var index = purchased_products.findIndex(pp => pp.productId === id);
            if(index < 0) return {
                ...state,
                totaly : totaly + price,
                purchased_products: purchased_products.concat({productId: id, quantity: action.quantity , price: price})
            }
            purchased_products[index].quantity = purchased_products[index].quantity + action.quantity; 
            return {
                ...state,
                totaly : totaly + price * action.quantity,
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
                totaly : totaly + price * (action.quantity - cantInicial),
                purchased_products
            }
        case EMPTY_CART: 
            return {
                purchased_products : [],
                totaly : 0 
            }
        case DELETE_PRODUCT:
            var {id, price } = action.product;
            var {purchased_products} = state;
            var index = purchased_products.findIndex(pp => pp.productId === id);
            var totalProducto = purchased_products[index].quantity * purchased_products[index].price;

            return {
                ...state,
                purchased_products: purchased_products.filter( producto => producto.productId !== id ),
                totaly: state.totaly - totalProducto,
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products : action.payload
            }
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail : action.payload[0]
            }
        default: return {...state}

    }
}