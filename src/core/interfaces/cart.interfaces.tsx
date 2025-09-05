import { Product } from "@core/interfaces/products.interfaces";

export interface CartProduct extends Product {
    quantity: number;
}

export interface GroupedProducts {
    seller: string;
    sellerId: number;
    products: CartProduct[];
}

export interface Costs {
    subtotal: number
    shipping: number
    total: number
}