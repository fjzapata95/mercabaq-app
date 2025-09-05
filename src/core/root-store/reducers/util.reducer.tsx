import { Action } from '@core/interfaces/redux.interfaces';
import {
    UTIL_APP_SHOW_ALERT,
    UTIL_APP_HIDE_ALERT,
    UTIL_APP_PROGRESS_DIALOG
} from '@core/constants/utilsConstans';

const initialState = {
    alert: {
        type: null,
        message: '',
        show: false,
        translator: false
    },
    progressDialog: false
};

interface Alert {
    message: string;
    show: boolean;
    type: any;
    translator?: boolean;
}

export interface UtilState {
    alert: Alert;
    progressDialog: boolean;
}

interface ShowAlertPayload {
    type: any;
    message: string;
    show: boolean;
    translator?: boolean;
}

interface ProgressDialogPayload {
    value: boolean;
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
const utilReducer = (state: UtilState = initialState, { type, payload }: Action) => {
    switch(type) {
        case UTIL_APP_SHOW_ALERT:
            return {
                ...state,
                alert: { ...payload as ShowAlertPayload }
            };
        case UTIL_APP_HIDE_ALERT:
            return {
                ...state,
                alert: {
                    type: '',
                    message: '',
                    show: false,
                    translator: false
                }
            };
        case UTIL_APP_PROGRESS_DIALOG:
            return {
                ...state,
                progressDialog: (payload as ProgressDialogPayload).value
            };
        default:
            return state;
    }
}

export default utilReducer;