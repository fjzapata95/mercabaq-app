export interface Props<T extends Object> {
    data: T;
    onChangeText: (value: any, field: keyof T) => void;
    next: (value: string | number) => void
}

export interface Checkout {
	name: string; // pago a : [codigo del pedido]
	invoice: string; // codigo del pedido
	description: string; //
	currency: string; //COP
	amount: string;
	country: string;
	lang: string;
	method: string;
}

export interface CheckoutResponse {
    message: string;
    data: Response;
    error: boolean
}

export interface Response {
    id: number;
}