import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// PAGES
import LoginScreen from '@screens/auth/LoginScreen';
import RegisterScreen from '@screens/auth/RegisterScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';

const Root = createNativeStackNavigator();

const Auth = () => {
    return (
        <Root.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="login"
        >
            <Root.Screen name="login" component={LoginScreen} />
            <Root.Screen name="register" component={RegisterScreen} />
            <Root.Screen name="forgot-password" component={ForgotPasswordScreen} />
        </Root.Navigator>
    );
};

export default Auth;
