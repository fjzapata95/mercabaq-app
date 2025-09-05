import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerBusiness from '@components/DrawerBusiness';
import { CustomHeader } from '@components/drawer/CustomHeader';

// PAGES
import { HomeScreen } from '@screens/my-business/HomeScreen';
import { CategoriesScreen } from '@screens/my-business/CategoriesScreen';
import { OrdersScreen } from '@screens/my-business/OrdersScreen';
import { OrderDetailScreen } from '@screens/my-business/OrderDetailScreen';
import { ProductsScreen } from '@screens/my-business/ProductsScreen';
import { CreateProductScreen } from '@screens/my-business/CreateProductScreen';
import { UpdateProductScreen } from '@screens/my-business/UpdateProductScreen';

const Root = createDrawerNavigator<any>();

export const MainBusinessStackScreen = () => {
    return (
        <Root.Navigator
            drawerContent={(props: any) => <DrawerBusiness {...props} />}
            screenOptions={{
                headerShown: true,
                drawerPosition: 'right',
                header: (props) => <CustomHeader {...props} />
            }}
            initialRouteName="home"
        >
            <Root.Screen name="home" component={HomeScreen} />
            <Root.Screen name="categories" component={CategoriesScreen} />
            <Root.Screen name="orders" component={OrdersScreen} />
            <Root.Screen name="orderdetail" component={OrderDetailScreen} options={{ headerShown: false }} />
            <Root.Screen name="products" component={ProductsScreen} />
            <Root.Screen name="createproduct" component={CreateProductScreen} options={{ headerShown: false }} />
            <Root.Screen name="updateproduct" component={UpdateProductScreen} options={{ headerShown: false }} />
        </Root.Navigator>
    );
};
