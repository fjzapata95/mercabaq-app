import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '@core/navigation';
import { theme } from '@core/theme';

import apiHelpers from '@core/auth/apiHelpers';

import { Fonts } from '@core/constants/fontsContans';
import { OrderDetail, OrderDetailResponse } from '@core/interfaces/order.interfaces';
import { LoandingPage } from '@components/LoandingPage';
import { NotFound } from '@components/NotFound';
import { AppBar } from '@components/AppBar';
import { OrderIdDetail } from '@components/layout/order/OrderDetail';
import { formatPrice } from '@core/utils/format';
import moment from 'moment';

interface Props extends NativeStackScreenProps<StackParams> {}

export const OrderDetailScreen = (props: Props) => {

    const { order }: any = props.route.params; // Obtener los datos
    
    const [detail, setDetail] = useState<OrderDetail[]>([]);
    const [loadingDetail, setLoadingDetail] = useState(true);

    /**
     * OBTENER DETALLE DEL PEDIDO
     */
    const loadOrderDetail = useCallback(async () => {
        const { params }: any = props.route;
        // VALIDAR ID DEL PRODUCTO
        if (params && params.id) {
            // LOANDING
            setLoadingDetail(true);
            try {
                const { data: { data, error } } = await apiHelpers.get<OrderDetailResponse>(`pedido/getdet/${params.id}`);
                // VALIDAR SI SE OBTUVO DATOS
                if (!error) {
                    // ASIGNAR DATOS
                    setDetail(data);
                } else {
                    // ASIGNAR DATOS
                    setDetail([]);
                }
                setLoadingDetail(false);
            } catch ({error}: any) {
                setDetail([]);
                setLoadingDetail(false);
                console.error(error);
            }
        }
    }, [props.route.params]);
    
    /**
     * 
     */
    useEffect(() => { loadOrderDetail(); }, [props.route.params]);

    return (
        <View style={styles.container}>
            <AppBar 
                title={'Detalle Pedido'}
                navigation={props.navigation}
                fromPage={'orders'}
            />
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        nestedScrollEnabled
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="handled"
                        contentInsetAdjustmentBehavior="automatic"
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    >
                        <View style={styles.body}>
                            <View>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: Fonts.ManropeRegular,
                                    color: theme.colors.custom_blue,
                                    marginBottom: 4
                                }} numberOfLines={1}>
                                    N° {order?.id}
                                </Text>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: Fonts.ManropeRegular,
                                    color: theme.colors.custom_blue,
                                    marginBottom: 4
                                }} numberOfLines={1}>
                                    {order?.UserModel?.name}
                                </Text>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: Fonts.ManropeRegular,
                                    color: theme.colors.custom_blue,
                                    marginBottom: 4
                                }} numberOfLines={1}>
                                    { moment(order?.fecha).format('DD MMMM YYYY')}
                                </Text>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: Fonts.ManropeRegular,
                                    color: theme.colors.custom_blue,
                                    marginBottom: 4
                                }} numberOfLines={1}>
                                    Pago: {order?.estadoPago}
                                </Text>
                            </View>
                            {detail && detail.map(obj => (
                                <OrderIdDetail detail={obj} />
                            ))}
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <View style={{backgroundColor: theme.colors.background, padding: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{marginRight: 4}}>
                        <Text style={styles.text}>Total:</Text>
                        <Text style={styles.amount}>{formatPrice(order?.montoTotal)}</Text>
                    </View>
                </View>

                {/**
                 * LOANING
                */}
                {loadingDetail && (
                    <LoandingPage size={30} color={theme.colors.primary} text={'Cargando detalle...'} textStyle={{color: theme.colors.custom_blue}} />
                )}
                {/**
                 * NOTFOUNT
                */}
                {!loadingDetail && Object.keys(detail).length == 0 && (
                    <NotFound text={'No se encontraron items'} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    body: {
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: theme.colors.background
    },

    iconContainer: {
        marginBottom: 14
    },
    icon: {
        fontSize: 50,
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_green_dark,
        textAlign: 'center',
        marginBottom: 10
    },
    orderNumber: {
        fontSize: 16,
        fontFamily: Fonts.ManropeRegular,
        color: theme.colors.custom_blue,
        textAlign: 'center',
        marginBottom: 2
    },
    orderId: {
        fontSize: 16,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_blue
    },
    detailContainer: {
        width: '100%',
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        fontFamily: Fonts.ManropeRegular,
        color: theme.colors.custom_blue
    },
    detailValue: {
        fontSize: 16,
        fontFamily: Fonts.ManropeRegular,
        color: theme.colors.custom_blue
    },
    totalContainer: {
        marginHorizontal: 16,
        paddingHorizontal: 8,
        alignSelf: 'flex-end'
    },
    totalText: {
        fontSize: 16,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_blue,
        textAlign: 'right',
    },
    buttonContainer: {
        flexDirection: 'column',
        marginHorizontal: 16,
        width: '100%'
    },
    primaryButton: {
        marginBottom: 10,
        backgroundColor: '#2E7D32',
    },
    secondaryButton: {
        borderColor: '#2E7D32',
    },

    cell: {
        flex: 1,
        minWidth: 100,
        maxWidth: 300,
        overflow: 'hidden',
        paddingHorizontal: 6
    },
    cellHeader: {
        fontSize: 16,
        fontFamily: Fonts.ManropeBold,
        color: '#2E2E2E'
    },

    text: {
        fontSize: 14,
        fontFamily: Fonts.ManropeMedium,
        color: theme.colors.custom_blue
    },
    amount: {
        fontSize: 30,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue
    },
});
