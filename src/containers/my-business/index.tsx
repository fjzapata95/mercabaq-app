import { ReduxState } from '@core/interfaces/redux.interfaces';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import CreateStackScreen from './create';
import { MainBusinessStackScreen } from './main';

export const MyBusinessStackScreen = () => {

    const { isAuth, business } = useSelector(({ auth }: ReduxState) => ({
        isAuth: auth.isAuth,
        business: auth.business
    }), shallowEqual);

    return <>
        {/* CARGAR CONTENIDO DE LA APP */}
        {isAuth && business && business.id ? <MainBusinessStackScreen/> : <CreateStackScreen />}
    </>;
};
