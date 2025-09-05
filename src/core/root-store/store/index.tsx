import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
// REDUCERS
import authReducer from '@rootStore/reducers/auth.reducer';
import cartReducer from '@rootStore/reducers/cart.reducer';
import filterReducer from '@rootStore/reducers/filter.reducer';
import utilReducer from '@rootStore/reducers/util.reducer';
// SAGAS
import rootSaga from '@rootStore/sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer: any = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    filter: filterReducer,
    util: utilReducer
});

const store: any = createStore(
    persistReducer(
        {
            key: 'mercabaq',
            storage: AsyncStorage
        },
        rootReducer
    ),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;