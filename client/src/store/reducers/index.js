import {
    ADD_PRODUCT,
    EDIT_PRODUCT,
    EMPTY_CART,
    DELETE_PRODUCT,

} from "../actions";

const initialState = {
    purchased_products :[
        {
            productId:0,
            quantity: 0,
            price:0 
        }
    ],
    totaly : 0 
}
export default (state = initialState, action) =>{
    switch(action.type){
        case ADD_PRODUCT:
            let {id, price} = action.product;
            let { purchased_products, totaly} = state;
            let index = purchased_products.findIndex(pp => pp.productId === id);
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
        /* case  EDIT_PRODUCT:
            let {id, price} = action.product;
            let { purchased_products} = state;
            let index = state.purchased_products.findIndex(pp => pp.productId === id);
            let cantInicial = state.purchased_products[index].quantity;
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
            let {id, price } = action.product;
            let { purchased_products} = state;
            let index = purchased_products.findIndex(pp => pp.productId === id);
            let totalProducto = purchased_products[index].quantity * purchased_products[index].price;
            return {
                ...state,
                purchased_products: purchased_products.filter( producto => {
                   producto.id !== id 
                }),
                totaly: totaly - totalProducto,
            } */

        default: return {...state}

    }
}