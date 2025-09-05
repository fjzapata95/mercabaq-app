import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, DataTable } from 'react-native-paper';
import { Fonts } from '@core/constants/fontsContans';
import { Order, OrderFilters } from '@core/interfaces/order.interfaces';
import { theme } from '@core/theme';

import { LoandingPage } from '@components/LoandingPage';
import { NotFound } from '@components/NotFound';
import { formatPrice } from '@core/utils/format';
import ButtonCustom from '@components/form/ButtonCustom';
import OrderDetailModal from './OrderDetail';

interface Props {
    orders: {data: Order[], total: number, currentPage: number, pages: number};
    filters: OrderFilters;
    loading: boolean;
    onChangePage: () => void;
}

export const DataTableOrders = ({ orders, filters, loading, onChangePage }: Props) => {

    const [order, setOrder] = useState<any>({});
    const [toggleOrderDetail, setToggleOrderDetail] = useState<boolean>(false);

    const handledModal = (data: Order) => {
        // ASIGNAR ORDEN
        setOrder(data);
        // MODAL
        setToggleOrderDetail(true);
    }

    const from = (filters.page - 1) * 10 + 1;
    const to = Math.min(filters.page * 10, orders.total);
    
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <DataTable>
                <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
                    {/* Encabezado de la tabla */}
                    <DataTable.Header>
                        <DataTable.Title textStyle={styles.cellHeader} style={styles.cell}>Pedido Id</DataTable.Title>
                        <DataTable.Title textStyle={styles.cellHeader} style={styles.cell}>Fecha/Tiempo</DataTable.Title>
                        <DataTable.Title textStyle={styles.cellHeader} style={styles.cell}>Comprador</DataTable.Title>
                        <DataTable.Title textStyle={styles.cellHeader} style={styles.cell}>Estado</DataTable.Title>
                        <DataTable.Title textStyle={styles.cellHeader} style={styles.cell}>Estado del pago</DataTable.Title>
                        <DataTable.Title textStyle={styles.cellHeader} style={styles.cell}>Monto</DataTable.Title>
                        <DataTable.Title textStyle={styles.cellHeader} style={styles.cell}>Acción</DataTable.Title>
                    </DataTable.Header>
                    {/* Filas de la tabla */}
                    {orders.data.map((order) => (
                        <DataTable.Row key={`pending-order_${order.id}`}>
                            <DataTable.Cell style={styles.cell}>{order.id}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{order.fecha}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{order.UserModel.name}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                                <Chip
                                    style={[
                                        styles.chip,
                                        order.estado === "Complete"
                                            ? styles.completeChip
                                            : styles.pendingChip,
                                    ]}
                                    textStyle={styles.chipText}
                                >
                                    {order.estado}
                                </Chip>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{order.estadoPago}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{formatPrice(order.montoTotal)}</DataTable.Cell>
                            <DataTable.Cell style={[styles.cell, { paddingHorizontal: 2 }]}>
                                <ButtonCustom
                                    mode={'outlined'}
                                    style={{
                                        borderRadius: 10,
                                        borderColor: theme.colors.custom_green_dark,
                                        width: 110,
                                        height: 40
                                    }}
                                    contentStyle={{
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: theme.colors.custom_green_dark,
                                        width: 110,
                                        height: 40
                                    }}
                                    labelStyle={{
                                        fontSize: 14,
                                        fontFamily: Fonts.ManropeMedium
                                    }}
                                    textColor={theme.colors.custom_green_dark}
                                    onPress={() => handledModal(order)}
                                >
                                    Ver detalle
                                </ButtonCustom>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </ScrollView>
                {/* Filas de la tabla */}
                <DataTable.Pagination
                    page={filters.page - 1}
                    numberOfPages={orders.pages}
                    onPageChange={(page) => onChangePage()}
                    label={`${from}-${to} de ${orders.total}`}
                    numberOfItemsPerPage={10} // Puedes hacerlo dinámico si lo necesitas
                    showFastPaginationControls
                    selectPageDropdownLabel="Filas por página"
                />
            </DataTable>
            {/**
             * LOANING
            */}
            {loading && (
                <LoandingPage size={100} color={theme.colors.primary} text={'Cargando Pedidos...'} textStyle={{color: theme.colors.custom_blue}} />
            )}
            {/**
             * NOTFOUNT
            */}
            {!loading && Object.keys(orders).length == 0 && (
                <NotFound text={'No se encontraron pedidos pendientes'} />
            )}
            {/**
             * FILTROS
            */}
            <OrderDetailModal order={order} visible={toggleOrderDetail} handleToggle={setToggleOrderDetail} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cell: {
        minWidth: 120,
        maxWidth: 120,
        overflow: 'hidden',
        paddingHorizontal: 6,
        alignItems: 'flex-start',
        alignSelf: 'center'
    },
    cellHeader: {
        fontSize: 16,
        fontFamily: Fonts.ManropeBold,
        color: '#2E2E2E'
    },
    chip: {
        paddingHorizontal: 8,
        borderRadius: 16,
    },
    completeChip: {
        backgroundColor: "#4CAF50",
    },
    pendingChip: {
        backgroundColor: "#FFE136",
    },
    chipText: {
        color: theme.colors.surface,
        fontFamily: Fonts.InterMedium,
        fontSize: 12
    },
});
