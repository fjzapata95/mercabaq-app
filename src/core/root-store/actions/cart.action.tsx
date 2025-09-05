import { CartProduct } from '@core/interfaces/cart.interfaces';
import {
    CART_APP_ADD_ITEM,
    CART_APP_CLEAR_CART,
    CART_APP_REMOVE_ITEM
} from '@core/constants/cartConstans';

/**
 * Agregar producto al carrito
 * @param item 
 * @returns 
 */
export const addItemToCart = (item: CartProduct) => ({
    type: CART_APP_ADD_ITEM,
    payload: item
});
  
/**
 * Remover un producto del carrito.
 * @param id ID del producto
 * @returns 
 */
export const removeItemFromCart = (id: number) => ({
    type: CART_APP_REMOVE_ITEM,
    payload: { id }
});
  
/**
 * Limpiar carrito
 * @returns 
 */
export const clearCart = () => ({
    type: CART_APP_CLEAR_CART
});
  