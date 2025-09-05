import { AuthRequest, PasswordForgetRequest, SignUpRequest, User } from '@core/interfaces/auth.interfaces';
import { 
    LOGIN_WITH_EMAIL_REQUEST,
    PASSWORD_FORGET_REQUEST,
    MERCABAQ_FORCED_LOGOFF,
    MERCABAQ_LOGOUT_REQUEST,
    MERCABAQ_RESET_FORCED_LOGOFF,
    MERCABAQ_TOKEN_SESSION,
    MERCABAQ_SIGNUP_REQUEST,
    MERCABAQ_ADD_BUSINESS_DATA,
} from '@core/constants/authConstans';
/**
 * 
 * @param token 
 * @returns 
 */
export const setToken = (token: string) => {
    return {
        type: MERCABAQ_TOKEN_SESSION,
        payload: token
    }
}
/**
 * 
 * @param params 
 * @returns 
 */
export const loginWithEmail = (params: AuthRequest) => {
    return {
        type: LOGIN_WITH_EMAIL_REQUEST,
        payload: params
    }
};
/**
 * 
 * @param params 
 * @returns 
 */
export const passwordForget = (email: PasswordForgetRequest) => {
    return {
        type: PASSWORD_FORGET_REQUEST,
        payload: email
    }
};
/**
 * 
 * @param params 
 * @returns 
 */
export const signUpEmail = (params: SignUpRequest) => {
    return {
        type: MERCABAQ_SIGNUP_REQUEST,
        payload: params
    }
};
/**
 * 
 * @returns 
 */
export const forcedLogoff = () => ({
    type: MERCABAQ_FORCED_LOGOFF
});
/**
 * 
 * @returns 
 */
export const resetForcedLogoff = () => ({
    type: MERCABAQ_RESET_FORCED_LOGOFF
});
/**
 * 
 * @param token 
 * @returns 
 */
export const setBusinessData = (data: any) => {
    return {
        type: MERCABAQ_ADD_BUSINESS_DATA,
        payload: { data }
    }
}
/**
 * 
 * @returns 
 */
export const logout = () => ({
    type: MERCABAQ_LOGOUT_REQUEST
});