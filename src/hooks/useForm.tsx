import { useState } from 'react';

export const useForm = <T extends Object>(initState: T) => {

    const [state, setState] = useState(initState);
    /**
     * 
     * @param value 
     * @param field 
     */
    const onChange = (value: any, field: keyof T) => {
        setState({
            ...state,
            [field]: value
        });
    }
    /**
     * MÉTODO PARA ASIGNAR DATOS AL FORMULARIO.
     * @param data 
     */
    const setFormdata = (data: any) => {
        // ASIGNAR DATA AL FORMULARIO.
        setState({
            ...state,
            ...data
        });
    }

    return {
        ...state,
        form: state,
        onChange,
        setFormdata
    }
}