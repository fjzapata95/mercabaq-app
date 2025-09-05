import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Modal, Portal, List, Divider } from 'react-native-paper';
import { View, StyleSheet, Text, Image } from 'react-native';
import { theme } from '@core/theme';

import ButtonCustom from '@components/form/ButtonCustom';
import { Fonts } from '@core/constants/fontsContans';
import { StackParams } from '@core/navigation';
import { formatPrice } from '@core/utils/format';

type Props = {
    navigation: NativeStackNavigationProp<StackParams, any, undefined>;
    visible: boolean;
    order: {id: any, subtotal: any, shipping: any, total: any};
    handleToggle: (value: boolean) => void;
}

const OrderSummaryModal = ({ navigation, order, visible, handleToggle }: Props) => {

    /**
     * LLEVAR AL CATALOGO
     */
    const goCatalog = () => {
        // CERRAR MODAL
        handleToggle(false); 
        // IR AL CATALOGO
        navigation.navigate('catalog')
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={goCatalog} contentContainerStyle={styles.modal}>
                <View style={styles.container}>
                    {/* Icono y mensaje principal */}
                    <View style={styles.iconContainer}>
                        <Image source={require('@assets/image/confetti.png')} style={{width: 120, height: 120}} />
                    </View>
                    <Text style={styles.title}>¡Su pago ha sido exitoso!</Text>
                    <Text style={styles.orderNumber}>Número de la orden:</Text>
                    <Text style={styles.orderId}>#{order.id}</Text>

                    <Divider style={{width: '90%', height: 1, marginVertical: 10, marginHorizontal: 12 }} />

                    {/* Resumen del pedido */}
                    <View style={styles.summaryContainer}>
                        <List.Item
                            title="Productos"
                            titleStyle={styles.summaryText}
                            right={props => <Text {...props} style={styles.summaryValue}>{formatPrice(order.subtotal)}</Text>}
                            style={{
                                paddingVertical: 1
                            }}
                        />
                        <List.Item
                            title="Domicilio"
                            titleStyle={styles.summaryText}
                            right={props => <Text {...props} style={styles.summaryValue}>{formatPrice(order.shipping)}</Text>}
                            style={{
                                paddingVertical: 1
                            }}
                        />

                        <Divider style={{width: '90%', height: 1, marginVertical: 10, marginHorizontal: 12 }} />

                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>{formatPrice(order.total)}</Text>
                        </View>
                    </View>

                    {/* Botones */}
                    <View style={styles.buttonContainer}>
                        <ButtonCustom
                            mode='contained'
                            buttonColor={theme.colors.custom_blue}
                            textColor={theme.colors.surface}
                            onPress={goCatalog}
                        >
                            Continuar comprando
                        </ButtonCustom>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: theme.colors.surface,
        margin: 20,
        borderRadius: 10,
        padding: 20
    },
    container: {
        alignItems: 'center'
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
    summaryContainer: {
        width: '100%',
        marginBottom: 20,
    },
    summaryText: {
        fontSize: 16,
        fontFamily: Fonts.ManropeRegular,
        color: theme.colors.custom_blue
    },
    summaryValue: {
        fontSize: 16,
        fontFamily: Fonts.ManropeRegular,
        color: theme.colors.custom_blue
    },
    totalContainer: {
        marginHorizontal: 16,
        paddingHorizontal: 8
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
});

export default OrderSummaryModal;
