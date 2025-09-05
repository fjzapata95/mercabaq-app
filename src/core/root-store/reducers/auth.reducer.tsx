import { Action } from '@core/interfaces/redux.interfaces';
import { User, UserBusiness } from '@core/interfaces/auth.interfaces';
import { 
    LOGIN_BTN_LOADING,
    LOGIN_WITH_EMAIL_FAILED,
    LOGIN_WITH_EMAIL_SUCCESS,
    MERCABAQ_ADD_BUSINESS_DATA,
    MERCABAQ_LOGOUT_SUCCESS
} from '@core/constants/authConstans';

const initialState = {
    sessionId: null,
    nameInitials: '',
    user: {
        id: 0,
        name: '',
        email: '',
        rol: 0,
        twoFactorEnabled: false
    },
    business: {
        id: 0,
        tipoPersona: '',
        tipoDocumento: '',
        nombreRazonSocial: '',
        nombreMostrar: '',
        numeroDocumento: '',
        estado: false
    },
    permissions: [],
    token: null,
    isAuth: false,
    loanding: false
};

export interface AuthState {
    sessionId: string | null;
    user: User;
    business: UserBusiness;
    permissions: string[];
    token: string | null;
    isAuth: boolean;
    loanding: boolean;
    nameInitials: string;
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
const authReducer = (state: AuthState = initialState, {type, payload}: Action) => {
    switch(type) {
        case LOGIN_WITH_EMAIL_SUCCESS:
            return {
                ...state,
                isAuth: true,
                ...payload
            };
        case MERCABAQ_ADD_BUSINESS_DATA:
            return {
                ...state,
                business: payload.data
            };
        case LOGIN_WITH_EMAIL_FAILED:
            return {
                ...state,
                ...payload
            };
        case LOGIN_BTN_LOADING:
            return {
                ...state,
                loanding: payload
            };
        case MERCABAQ_LOGOUT_SUCCESS:
            return {
                sessionId: null,
                user: {
                    id: 0,
                },
                business: {
                    id: 0,
                    numeroDocumento: 0
                },
                permissions: [],
                token: null,
                isAuth: false,
                loanding: false,
                nameInitials: ''
            };
        default:
            return state;
    }
}

export default authReducer;