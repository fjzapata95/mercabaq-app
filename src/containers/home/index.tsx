import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainHeader } from '@components/MainHeader';
// PAGES
import { HomeScreen } from '@screens/app/HomeScreen';
import { ProductScreen } from '@screens/app/ProductScreen';
import { ShoppingCartScreen } from '@screens/app/ShoppingCartScreen';
import { CheckoutScreen } from '@screens/app/CheckoutScreen';

const Root = createNativeStackNavigator();

export const HomeStackScreen = () => {
    return (
        <Root.Navigator
            screenOptions={{
                headerShown: true,
                header: (props) => <MainHeader {...props} />
            }}
            initialRouteName="home"
        >
            <Root.Screen name="home" component={HomeScreen} />
            <Root.Screen name="product" component={ProductScreen} />
            <Root.Screen name="shoppingcart" component={ShoppingCartScreen} options={{ headerShown: false }} />
            <Root.Screen name="checkout" component={CheckoutScreen} options={{ headerShown: false }} />
        </Root.Navigator>
    );
};
