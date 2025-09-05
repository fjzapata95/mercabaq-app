import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomHeader } from '@components/drawer/CustomHeader';
import { theme } from '@theme';

// PAGES
import { HomeScreen } from '@screens/account/HomeScreen';
import { AboutUsScreen } from '@screens/account/AboutUsScreen';
import { ProfileScreen } from '@screens/account/ProfileSreen';
import { ProfileFormSreen } from '@screens/account/ProfileFormSreen';
import { PurchasesScreen } from '@screens/account/PurchasesScreen';
import { OrderDetailScreen } from '@screens/my-business/OrderDetailScreen';
import { AddressesScreen } from '@screens/account/AddressesScreen';
import { CreateAddressScreen } from '@screens/account/CreateAddressScreen';
import { UpdateAddressScreen } from '@screens/account/UpdateAddressScreen';
import { PqrScreen } from '@screens/account/PqrScreen';
import { CreatePqrScreen } from '@screens/account/CreatePqrScreen';

const Root = createDrawerNavigator<any>();

const Application = () => {
    return (
        <Root.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: theme.colors.custom_blue
                },
                headerTintColor: theme.colors.surface,
                headerTitleStyle: { fontWeight: 'bold' },
                header: (props) => <CustomHeader {...props} buttonDrawer={false}/>
            }}
        >
            <Root.Screen name="home" component={HomeScreen} />
            <Root.Screen name="orders" component={PurchasesScreen} options={{ headerShown: false }} />
            <Root.Screen name="orderdetail" component={OrderDetailScreen} options={{ headerShown: false }} />
            <Root.Screen name="aboutus" component={AboutUsScreen} options={{ headerShown: false }} />
            <Root.Screen name="profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Root.Screen name="profileform" component={ProfileFormSreen} options={{ headerShown: false }} />
            <Root.Screen name="addresses" component={AddressesScreen} options={{ headerShown: false }} />
            <Root.Screen name="createaddress" component={CreateAddressScreen} options={{ headerShown: false }} />
            <Root.Screen name="updateaddress" component={UpdateAddressScreen} options={{ headerShown: false }} />
            <Root.Screen name="pqr" component={PqrScreen} options={{ headerShown: false }} />
            <Root.Screen name="createpqr" component={CreatePqrScreen} options={{ headerShown: false }} />
        </Root.Navigator>
    );
};

export default Application;
