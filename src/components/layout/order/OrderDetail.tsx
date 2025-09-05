import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Portal, Divider, DataTable } from 'react-native-paper';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { theme } from '@core/theme';

import apiHelpers from '@core/auth/apiHelpers';
import ButtonCustom from '@components/form/ButtonCustom';

import { Fonts } from '@core/constants/fontsContans';
import { formatPrice } from '@core/utils/format';
import { Order, OrderDetail, OrderDetailResponse } from '@core/interfaces/order.interfaces';
import { LoandingPage } from '@components/LoandingPage';
import { NotFound } from '@components/NotFound';

type Props = {
    detail: OrderDetail;
}

export const OrderIdDetail = ({ detail }: Props) => {

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.containerImg}>
                    {/*<Image
                        source={{ uri: product.image }}
                        style={styles.imageProd}
                        resizeMode="cover"
                    />*/}
                </View>
                <View style={{paddingHorizontal: 10, paddingVertical: 6, width: 200}}>
                    <Text style={styles.nameProd} numberOfLines={2} ellipsizeMode="tail">
                        {detail.nombreProducto}
                    </Text>
                    <Text style={styles.price}>
                        Precio: {formatPrice(detail.precio)}
                    </Text>
                    <Text style={styles.price}>
                        Cantidad: {detail.cantidad}
                    </Text>
                    <Text style={styles.price}>
                        SubTotal: {formatPrice(detail.subTotal)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        backgroundColor: theme.colors.background
    },
    containerImg: {
        width: 133,
        height: 112,
        borderRadius: 6,
        backgroundColor: theme.colors.custom_grey_light
    },
    imageProd: {
        width: '100%',
        height: '100%',
    },
    nameProd: {
        fontSize: 14,
        fontFamily: Fonts.ManropeMedium,
        color: theme.colors.custom_blue,
    },
    price: {
        fontSize: 14,
        fontFamily: Fonts.DMSansSemiBold,
        color: theme.colors.custom_blue,
        marginTop: 4
    }
});
