

import { AlertParams } from '@core/interfaces/util.interfaces';
import {
    UTIL_APP_SHOW_ALERT,
    UTIL_APP_HIDE_ALERT,
    UTIL_APP_PROGRESS_DIALOG
} from '@core/constants/utilsConstans';

/**
 * 
 * @returns 
 */
export const showAlert = (parmas: AlertParams) => {
    return {
        type: UTIL_APP_SHOW_ALERT,
        payload: {
            ...parmas,
            show: true
        }
    }
}
/**
 * 
 * @returns 
 */
export const hideAlert = () => {
    return {
        type: UTIL_APP_HIDE_ALERT
    }
}
/**
 * 
 * @returns 
 */
export const progressDialog = (value: boolean) => {
    return {
        type: UTIL_APP_PROGRESS_DIALOG,
        payload: { value }
    }
}