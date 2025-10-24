import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { MERCABAQ_TOKEN_SESSION } from '@core/constants/authConstans';
import AsyncStorage from '@react-native-async-storage/async-storage';
// REDUX
import store from '@rootStore/store';
import { logout } from '@core/root-store/actions/auth.action';
import { showAlert } from '@core/root-store/actions/util.action';

/**
 * CIERRE DE SESION
 */
const handleLogout = () => {
    // CERRAR SESION  
    store.dispatch(logout());
    // NOTIFICACION
    store.dispatch(showAlert({ show: true, message: 'Tu sesión ha expirado por motivos de seguridad. Por favor, inicia sesión nuevamente para continuar.' }));
};
// 
const apiHelpers: AxiosInstance = axios.create();

apiHelpers.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        // OBTENER TOKEN - VALOR POR DEFECTO NULL
        const MERCABAQ_TOKEN_API = await AsyncStorage.getItem(MERCABAQ_TOKEN_SESSION);
        // ASIGNAR BASE URL CONFIGURADA.
        config.baseURL = `https://apinod.jointerp.com/api/v2/`;
        // VALIDAR CABECERA Y TOKEN.
        if (config && MERCABAQ_TOKEN_API) {
            // ASIGNAR TOKEN.
            config.headers = {
                Authorization: `Bearer ${MERCABAQ_TOKEN_API}`
            };
        }
        // 
        return config as InternalAxiosRequestConfig;
    }
);

apiHelpers.interceptors.response.use((response) =>  {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // console.log(response)
    // Do something with response data
    return response;
}, (error) => {
    // Validar si existe una respuesta del servidor
    if (error.response) {
        // OBTENER DATA
        const { status, data } = error.response;
        // Manejar el código 406
        if (status === 406) {
            // CERRAR SESION
            handleLogout();       
        }
    }
    // SE VALIDA SI EL ERROR ES DIFERENTE A CANCELADO
    if (!axios.isCancel(error)) {
        // LOG ERROR
        console.log('interceptors: ', error?.response?.data || error?.response || error)
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response || error);
});

export default apiHelpers;