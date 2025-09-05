import { Action } from '@core/interfaces/redux.interfaces';
import { CartProduct } from '@core/interfaces/cart.interfaces';
import {
    CART_APP_ADD_ITEM,
    CART_APP_CLEAR_CART,
    CART_APP_REMOVE_ITEM
} from '@core/constants/cartConstans';

const initialState = {
  items: [],
};

export interface CartState {
    items: Array<CartProduct>;
}

// Reducer del carrito
const cartReducer = (state: CartState = initialState, { type, payload }: Action) => {
    switch (type) {
        case CART_APP_ADD_ITEM:
            // Verificar si el item ya existe en el carrito, si existe, actualizamos la cantidad.
            const itemIndex = state.items.findIndex(item => item.id === payload.id);

            if (itemIndex >= 0) {
                const updatedItems = [...state.items];
                updatedItems[itemIndex].quantity = payload.quantity || 1;
                return {
                    ...state,
                    items: updatedItems
                };
            }
            
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        ...payload,
                        quantity: payload.quantity || 1
                    }
                ]
            };
        case CART_APP_REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== payload.id)
            };
        case CART_APP_CLEAR_CART:
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
}

export default cartReducer;
