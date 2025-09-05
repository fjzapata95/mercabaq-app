import { HANDLE_CATALOG_FILTER, RESET_CATALOG_FILTER } from "@core/constants/filterConstans"

/**
 * 
 * @param value 
 * @returns 
 */
export const handleFilter = (value: any) => {
    return {
        type: HANDLE_CATALOG_FILTER,
        payload: value
    }
}

/**
 * 
 * @returns 
 */
export const resetFilter = () => {
    return {
        type: RESET_CATALOG_FILTER
    }
}