import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { AuthResponse, PassForgetResponse, SignUpResponse } from '@core/interfaces/auth.interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { progressDialog, showAlert } from '@core/root-store/actions/util.action';
import { Action } from '@core/interfaces/redux.interfaces';
import apiHelpers from '@core/auth/apiHelpers';
import {
    LOGIN_BTN_LOADING,
    LOGIN_WITH_EMAIL_REQUEST,
    LOGIN_WITH_EMAIL_SUCCESS,
    PASSWORD_FORGET_REQUEST,
    MERCABAQ_FORCED_LOGOFF,
    MERCABAQ_LOGOUT_REQUEST,
    MERCABAQ_LOGOUT_SUCCESS,
    MERCABAQ_TOKEN_SESSION,
    MERCABAQ_SIGNUP_REQUEST
} from '@core/constants/authConstans';
/**
 * 
 * @param param0 
 */
function* loginWithEmailSaga({payload}: Action) {
    try {
        // LOANDING
        yield put({ type: LOGIN_BTN_LOADING, payload: true});
        // 
        const { data: { error, data, message }}: AuthResponse = yield call(apiHelpers.post, 'login', { ...payload });
        // VALIDAR RETORNO DE DATOS.
        if (!error && data) {
            // OBTENER CAMPAÑA ACTUAL Y NOMBRE DEL USUARIO.
            const { id, name } = data.userAct;
            /**
             * OBTENER INICIALES DEL NOMBRE DEL USUARIO EN SESION.
             */
            const string: any = name.split(' ');
            const iniciales = string.map((item: string) => item.charAt(0).toUpperCase());
            // 
            yield put({ type: LOGIN_WITH_EMAIL_SUCCESS, payload: {
                sessionId: id,
                user: data.userAct,
                business: data.negocio,
                token: data.accessToken,
                nameInitials: (iniciales.join('')).substr(0, 2)
            }});
            // SE GUARDA TOKEN PARA LA CONFIGURACIÓN DE AXIOS - INTERCEPTOR.
            yield call(AsyncStorage.setItem, MERCABAQ_TOKEN_SESSION, data.accessToken);
        } else {
            // MESSAGE
            yield put(showAlert({message: message}));
        }
        // LOANDING
        yield put({ type: LOGIN_BTN_LOADING, payload: false});
    } catch (error) {
        // LOANDING
        yield put({ type: LOGIN_BTN_LOADING, payload: false});
        // MESSAGE
        yield put(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar tu inicio de sesión en este momento. Por favor, verifica tu correo electrónico y contraseña e intenta nuevamente.', translator: true}));
        // ERROR
        console.log('AUTH - ERROR: ', error)
    }
}
/**
 * 
 * @param param0 
 */
function* passwordForgetSaga({ payload }: Action) {
    try {
        // LOANDING
        yield put({ type: LOGIN_BTN_LOADING, payload: true});

        console.log(payload)
        // 
        const { data: { error, message }}: PassForgetResponse = yield call(apiHelpers.get, `recovery/${payload.email}`);
        // VALIDAR RETORNO DE DATOS.
        if (!error) {
            // MESSAGE
            yield put(showAlert({message: message}));
        } else {
            // MESSAGE
            yield put(showAlert({message: message}));
        }
        // LOANDING
        yield put({ type: LOGIN_BTN_LOADING, payload: false});
    } catch (error) {
        // LOANDING
        yield put({ type: LOGIN_BTN_LOADING, payload: false});
        // MESSAGE
        yield put(showAlert({show: true, message: 'Lamentablemente, no hemos podido procesar tu solicitud de restablecimiento de contraseña en este momento. Asegúrate de que la dirección de correo electrónico proporcionada sea la misma con la que te registraste. Si el problema persiste, por favor, ponte en contacto con nuestro equipo de soporte.', translator: true}));
        // ERROR
        console.log('PASSWORD FORGET - ERROR: ', error)
    }
}
/**
 * 
 * @param param0 
 */
function* signUpSaga({ payload }: Action) {
    try {
        // LOANDING
        yield put({ type: LOGIN_BTN_LOADING, payload: true});
        // 
        const { data: { error, message }}: SignUpResponse = yield call(apiHelpers.post, 'user/create', payload);
        // VALIDAR RETORNO DE DATOS.
        if (!error) {
            // MESSAGE
            yield put(showAlert({message: message}));
        } else {
            // MESSAGE
            yield put(showAlert({message: message}));
        }
        // LOANDING
        yield put({ type: LOGIN_BTN_LOADING, payload: false});
    } catch (error) {
        // LOANDING
        yield put({ type: LOGIN_BTN_LOADING, payload: false});
        // MESSAGE
        yield put(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar el registro en este momento. Por favor, verifica tus datos e intenta nuevamente.', translator: true}));
        // ERROR
        console.log('SIGNUP - ERROR: ', error)
    }
}
/**
 * 
 */
function* logoutSaga() {
    try {
        // LOANDING
        yield put(progressDialog(true));
        // 
        // yield call(apiHelpers.post, 'logout');
        // RESET DATA
        yield put({ type: MERCABAQ_LOGOUT_SUCCESS, payload: true});
        // LOANDING
        yield put(progressDialog(false));
    } catch (error) {
        // LOANDING
        yield put(progressDialog(false));
        // ERROR
        console.log('LOGOUT - ERROR: ', error)
    }
}

function* authRootSaga() {
    yield all([
        takeEvery(LOGIN_WITH_EMAIL_REQUEST, loginWithEmailSaga),
        takeEvery(PASSWORD_FORGET_REQUEST, passwordForgetSaga),
        takeEvery(MERCABAQ_SIGNUP_REQUEST, signUpSaga),
        takeEvery(MERCABAQ_FORCED_LOGOFF, logoutSaga),
        takeEvery(MERCABAQ_LOGOUT_REQUEST, logoutSaga)
    ]);
}

const authSagas = [
    fork(authRootSaga)
];

export default authSagas;