import { Order } from '@core/interfaces/order.interfaces';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackParams = {
    login: undefined;
    register: undefined;
    // APPS
    home: undefined;
    catalog: { search?: string, category?: any } | undefined;
    mybusiness: undefined;
    auth: undefined;
    // ACCOUNT
    aboutus: undefined;
    profile: undefined;
    profileform: undefined;
    addresses: undefined;
    createaddress: undefined;
    updateaddress: { id: number }
    pqr: undefined;
    createpqr: undefined;
    // APPS
    product: { id: number }
    // 
    shoppingcart: undefined;
    checkout: undefined;
    // BUSINESS
    createproduct: undefined;
    categories: undefined;
    orders: undefined;
    orderdetail: { id: number, order: Order }
    products: undefined;
    createbusiness: undefined;
    updateproduct: { id: number };
};

export type StackNavProps<T extends keyof StackParams> = {
    navigation: NativeStackNavigationProp<StackParams, T>;
    route: RouteProp<StackParams, T>;
    t: any;
};
