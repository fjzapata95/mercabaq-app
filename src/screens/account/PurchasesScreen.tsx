import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
//
import { theme } from '@theme';
import { StackParams } from '@core/navigation';
import { Order, OrderFilters, PendingOrderResponse } from '@core/interfaces/order.interfaces';
import { OrderHeader } from '@components/layout/my-business/OrderHeader';
import { OrderFilter } from '@components/layout/my-business/OrderFilter';
import { LoandingPage } from '@components/LoandingPage';
import { NotFound } from '@components/NotFound';
import { CardOrder } from '@components/layout/order/CardOrder';

import apiHelpers from '@core/auth/apiHelpers';
import axios from 'axios';
import { AppBar } from '@components/AppBar';

interface Props extends NativeStackScreenProps<StackParams> {}

export const PurchasesScreen = (props: Props) => {

    const [orders, setOrders] = useState<{data: Order[], total: number, currentPage: number, pages: number}>({
        data: [],
        total: 0,
        currentPage: 0,
        pages: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [toggleFilter, onToggleFilter] = useState<boolean>(false);
    const [filters, onFilters] = useState<OrderFilters>({
        estado: '',
        page: 1
    });
    
    // REFERENCIA PARA LES PETICIONES.
    const ordersReqRef: any = useRef<any>(null);

    /**
     * OBTENER LISTADO DE PEDIDOS
     */
    const loadOrders = useCallback(async () => {
        try {
            // OBTENER DATOS.
            const { page } = filters;
            // VALIDAR QUE SEA LA PRIMERA PAGINA.
            if (page === 1) setLoading(true);
            // REQUEST CURRENT - VALIDACIÓN PARA LAS PETICIONES REPETIDAS.
            ordersReqRef && ordersReqRef.current && ordersReqRef.current();
            // TOKEN PARA LAS PETICIONES.
            const { CancelToken } = axios;

            const { data: { data } } = await apiHelpers.get<PendingOrderResponse>('pedido/getest', {
                params: { ...filters },
                cancelToken: new CancelToken(c => {
                    ordersReqRef.current = c;
                })
            });
            // ASIGNAR DARA
            setOrders(() => ({
                data: page === 1 ? data.data : [...orders.data, ...data.data],
                total: data.total,
                pages: data.pages,
                currentPage: page
            }));
            setLoading(false);
            setIsFetching(false);
        } catch (error) {
            setOrders({
                data: [],
                total: 0,
                currentPage: 0,
                pages: 0
            });
            setLoading(false);
            setIsFetching(false);
            console.error(error);
        }
    }, [filters, orders]);

    /**
     * 
     * @param value 
     * @param field 
     */
    const onChangeFilter = (field: string, value: any) => {
        // 
        onFilters((filters) => ({
            ...filters,
            [field]: value,
            page: 1 // POR DEFECTO - CUALQUIER CAMBIO EN EL FILTRO SE DEVUELVE A LA PAGINA 1
        }));
    }
    /**
     * 
     */
    const onScroll = useCallback(() => {
        //
        setIsFetching(true);
        // OBTENER PAGINA ACTUAL
        const { page } = filters;
        // ASIGNAR NUEVA PAGINA AL FILTRO.
        onFilters((filters) => ({
            ...filters,
            page: page + 1
        }));
    }, [filters]);
    /**
     * 
     */
    const onRefresh = () => {
        setIsFetching(true);
        // ASIGNAR NUEVA PAGINA AL FILTRO.
        onFilters((filters) => ({
            ...filters,
            page: 1
        }));
    };

    useEffect(() => { loadOrders(); }, [filters]);

    useEffect(() => { loadOrders(); }, []);
    
    /**
     * RENDER ORDER
     * @param param0 
     * @returns 
     */
    const renderItem = ({ item }: { item: Order }) => (
        <View style={styles.orderContainer}>
            <CardOrder {...props} order={item} />
        </View>
    );
    
    return (
        <View style={styles.container}>
            <AppBar 
                title={'Mis Compras'}
                navigation={props.navigation}
                fromPage={'home'}
            />
            <OrderHeader handleToggleFilter={onToggleFilter} data={orders} />
            <View style={[styles.container, {marginTop: 10}]}>
                <FlatList
                    data={orders.data}
                    keyExtractor={(item, index) => `purchase_admin_${item.id}-${index}`}
                    renderItem={renderItem}
                    style={{
                        backgroundColor: theme.colors.background
                    }}
                    showsVerticalScrollIndicator={false}
                    refreshing={isFetching}
                    onRefresh={onRefresh}
                    onEndReached={onScroll}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    ListEmptyComponent={() => <NotFound text={'No se encontraron pedidos'} />}
                />
                {/* CONTENEDEDOR - LOANDING */}
                {loading && (
                    <LoandingPage
                        size={100}
                        color={theme.colors.primary}
                        background={theme.colors.background}
                    />
                )}
            </View>

            <OrderFilter filters={filters} visible={toggleFilter} handleToggleFilter={onToggleFilter} onChangeFilter={onChangeFilter} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    orderContainer: {
        flex: 1
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 12
    }
});
