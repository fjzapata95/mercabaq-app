import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '@core/theme';

// PAGES
import { CreateBusiness } from '@screens/my-business/CreateBusiness';
import { WelcomeScreen } from '@screens/my-business/WelcomeScreen';
import { CustomHeader } from '@components/drawer/CustomHeader';
import LoginScreen from '@screens/auth/LoginScreen';
import RegisterScreen from '@screens/auth/RegisterScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';

const Root = createNativeStackNavigator();

const CreateStackScreen = () => {
    return (
        <Root.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: theme.colors.custom_blue
                },
                headerTintColor: theme.colors.surface,
                headerTitleStyle: { fontWeight: 'bold' },
                header: (props) => <CustomHeader {...props} buttonDrawer={false} />
            }}
            initialRouteName="welcome"
        >
            <Root.Screen name="welcome" component={WelcomeScreen} />
            <Root.Screen name="createbusiness" component={CreateBusiness} />
            <Root.Screen name="login" component={LoginScreen} />
            <Root.Screen name="register" component={RegisterScreen} />
            <Root.Screen name="forgot-password" component={ForgotPasswordScreen} />
        </Root.Navigator>
    );
};

export default CreateStackScreen;
