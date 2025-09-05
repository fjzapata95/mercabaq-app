import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import apiHelpers from '@core/auth/apiHelpers';
import { Fonts } from '@core/constants/fontsContans';
import { Order, OrderFilters, PendingOrderResponse } from '@core/interfaces/order.interfaces';
import { theme } from '@core/theme';

import { DataTableOrders } from '../order/DataTable';

export const PendingOrders = () => {

    const [orders, setOrders] = useState<{data: Order[], total: number, currentPage: number, pages: number}>({
        data: [],
        total: 0,
        currentPage: 0,
        pages: 0
    });
    const [filters, onFilters] = useState<OrderFilters>({
        estado: 'NUEVO',
        page: 1
    });
    const [loading, setLoading] = useState(true);

    /**
     * OBTENER LISTADO DE PEDIDOS PENDIENTES
     */
    const loadPendingOrders = useCallback(async () => {
        // LOANDING
        setLoading(true);
        try {
            const { data: { data, error } } = await apiHelpers.get<PendingOrderResponse>('pedido/getest', {params: { ...filters }});
            // VALIDAR SI SE OBTUVO DATOS
            if (!error) {
                // ASIGNAR DATOS
                setOrders(data);
            } else {
                // ASIGNAR DATOS
                setOrders({
                    data: [],
                    total: 0,
                    currentPage: 0,
                    pages: 0
                });
            }
            setLoading(false);
        } catch (error) {
            setOrders({
                data: [],
                total: 0,
                currentPage: 0,
                pages: 0
            });
            setLoading(false);
            console.error(error);
        }
    }, [filters]);

    /**
     * 
     */
    const onChangePage = useCallback(() => {
        // OBTENER PAGINA ACTUAL
        const { page } = filters;
        // ASIGNAR NUEVA PAGINA AL FILTRO.
        onFilters((filters) => ({
            ...filters,
            page: page + 1
        }));
    }, [filters]);

    useEffect(() => {
        loadPendingOrders();
    }, []);

    return (
        <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.colors.background }}>
            <Text variant="titleLarge" style={styles.title}>
                Pedidos pendientes
            </Text>
            {/**  */}
            <DataTableOrders orders={orders} loading={loading} filters={filters} onChangePage={onChangePage} /> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_blue,
        paddingVertical: 20
    }
});
