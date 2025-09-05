import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
// CONTAINERS
import Auth from '@containers/auth/auth';
import Application from '@containers/account/application';
// INTERFACE
import { ReduxState } from '@core/interfaces/redux.interfaces';

export const AuthStackScreen = () => {

    const { isAuth } = useSelector(({ auth }: ReduxState) => ({
        isAuth: auth.isAuth
    }), shallowEqual);

    return <>
        {/* CARGAR CONTENIDO DE LA APP */}
        {isAuth ? <Application/> : <Auth />}
    </>;
};