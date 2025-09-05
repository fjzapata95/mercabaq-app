import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainHeader } from '@components/MainHeader';
// PAGES
import { CatalogScreen } from '@screens/app/CatalogScreen';
import { ProductScreen } from '@screens/app/ProductScreen';
import { ShoppingCartScreen } from '@screens/app/ShoppingCartScreen';
import { CheckoutScreen } from '@screens/app/CheckoutScreen';

const Root = createNativeStackNavigator();

export const CatalogStackScreen = () => {
    return (
        <Root.Navigator
            screenOptions={{
                headerShown: true,
                header: (props) => <MainHeader {...props} />
            }}
            initialRouteName="catalog"
        >
            <Root.Screen name="catalog" component={CatalogScreen} />
            <Root.Screen name="product" component={ProductScreen} />
            <Root.Screen name="shoppingcart" component={ShoppingCartScreen} options={{ headerShown: false }} />
            <Root.Screen name="checkout" component={CheckoutScreen} options={{ headerShown: false }} />
        </Root.Navigator>
    );
};
