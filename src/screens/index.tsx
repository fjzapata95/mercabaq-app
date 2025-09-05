import React, { useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Text, BottomNavigation } from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicon from 'react-native-vector-icons/Ionicons';

// NOTIFICACIONES
import { Alert } from 'react-native';

import { HomeStackScreen } from '@containers/home';
import { CatalogStackScreen } from '@containers/catalog';
import { MyBusinessStackScreen } from '@containers/my-business';
import { AuthStackScreen } from '@containers/index';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
// REDUX
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { hideAlert } from '@core/root-store/actions/util.action';

const Tab = createBottomTabNavigator();

type Props = {
    navigate: (name: string, params: any, title?: any) => void
}

const RootStackScreen = ({ navigate }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const { alert } = useSelector(({ util }: ReduxState) => ({
        alert: util.alert
    }), shallowEqual);
    /**
     * 
     */
    useEffect(() => {
        if (alert.show) {
            // MENSAJE
            let message: string = alert.message;
            // VALIDAR SI ES UN TEXTO CON TRADUCCION.
            if (alert.translator) {
                // TRADUCCION.
                // message = t(alert.message);
            }
            /**
             * 
             */
            Alert.alert('Información', message, [
                {
                    text: 'Ok',
                    onPress: () => { dispatch(hideAlert()); }
                },
            ]);
        }
    }, [alert]);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    style={{
                        backgroundColor: theme.colors.background,
                        // BORDE
                        shadowColor: theme.colors.onSurface,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        borderWidth: 1,
                        borderColor: '#ddd'
                    }}
                    activeColor={theme.colors.custom_green_dark}
                    inactiveColor={theme.colors.custom_grey}
                    activeIndicatorStyle={{
                        backgroundColor: 'transpatent'
                    }}
                    theme={theme}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        });
            
                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({ focused, color, size: 24 });
                        }
            
                        return null;
                    }}
                    renderLabel={({ route, focused }) => {
                        const { options } = descriptors[route.key];
                        const label: any =
                          options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;
        
                        return (
                            <Text
                                style={{
                                    color: focused
                                        ? theme.colors.custom_green_dark
                                        : theme.colors.custom_grey,
                                    fontSize: 13,
                                    fontFamily: Fonts.ManropeBold,
                                    alignSelf: 'center'
                                }}
                            >
                                {label}
                            </Text>
                        );
                    }}
                />
            )}
        >
            <Tab.Screen
                key={'main_home'}
                name="home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: (props) => <IconFeather name="home" {...props} />
                }}
            />
            <Tab.Screen
                key={'main_catalog'}
                name="catalog"
                component={CatalogStackScreen}
                options={{
                    tabBarLabel: 'Catálogo',
                    tabBarIcon: (props) => <IconFeather name="package" {...props} />
                }}
            />
            <Tab.Screen
                key={'main_mybusiness'}
                name="mybusiness"
                component={MyBusinessStackScreen}
                options={{
                    tabBarLabel: 'Mi Negocio',
                    tabBarIcon: (props) => <IconIonicon name="storefront-outline" {...props} />,
                }}
            />
            <Tab.Screen
                key={'main_auth'}
                name="auth"
                component={AuthStackScreen}
                options={{
                    tabBarLabel: 'Mi Cuenta',
                    tabBarIcon: (props) => <IconFeather name="user" {...props} />
                }}
            />
        </Tab.Navigator>
    );
};

export default RootStackScreen;