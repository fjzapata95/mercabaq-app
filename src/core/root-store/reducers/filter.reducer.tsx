import { HANDLE_CATALOG_FILTER, RESET_CATALOG_FILTER } from "@core/constants/filterConstans";
import { Action } from "@core/interfaces/redux.interfaces";

const initialState = {
    search: null,
    category: null,
};

export interface FilterState {
    search: string | null;
    category: number | null;
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
const filterReducer = (state: FilterState = initialState, { type, payload }: Action) => {
    switch(type) {
        case HANDLE_CATALOG_FILTER:
            return {
                ...state,
                ...payload
            };
        case RESET_CATALOG_FILTER:
            return {
                search: null,
                category: null,
            };
        default:
            return state;
    }
}

export default filterReducer;