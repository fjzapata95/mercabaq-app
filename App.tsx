import React from 'react';
import { PaperProvider } from 'react-native-paper';

import { theme } from '@core/theme';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer, NavigationContainerRef, ParamListBase, useNavigationContainerRef } from '@react-navigation/native';

import store from '@rootStore/store';
import RootStackScreen from '@screens/index';

const persistor = persistStore(store);

const App = (): React.JSX.Element => {
    /**
     * 
     */
    const navigationRef = useNavigationContainerRef<NavigationContainerRef<ParamListBase>>()

    /**
     * Función de navegación dinámica
     * @param name - Nombre de la ruta
     * @param params - Parámetros opcionales para la ruta
     */
    const navigate = (name: string, params?: Record<string, any>) => {
        if (navigationRef.isReady()) {
            navigationRef.navigate(name as keyof ParamListBase, params as any);
        }
    };
    
    return (
        <Provider store={store}>            
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider theme={theme}>
                    <NavigationContainer>
                        <RootStackScreen navigate={navigate} />
                    </NavigationContainer>
                </PaperProvider >
            </PersistGate>
        </Provider>
    );
}

export default App;
