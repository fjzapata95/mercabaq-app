
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from '@core/constants/fontsContans';
import { formatPrice } from '@core/utils/format';
import { theme } from '@core/theme';

// REDUX
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { Costs } from '@core/interfaces/cart.interfaces';

interface Props {
    handleCosts?: (costs: Costs) => void;
}

export const Summary = ({ handleCosts }: Props) => {

    const { cartProd } = useSelector(({ cart }: ReduxState) => ({
        cartProd: cart.items
    }), shallowEqual);
    
    const [costs, setCosts] = useState<Costs>({
        subtotal: 0,
        shipping: 0,
        total: 0
    });

    /**
     * Calcular el costos
     */
    const calculateCosts = useCallback(() => {
        const shipping = 0; // COSTO DE ENVÌO
        const subtotal = cartProd.reduce((acc, product) => {
            return acc + parseFloat(product.price) * product.quantity;
        }, 0);

        setCosts({
            shipping,
            subtotal: subtotal,
            total: subtotal + shipping
        })

        if (handleCosts) {
            // RETORNAR VALORES.
            handleCosts({
                shipping,
                subtotal: subtotal,
                total: subtotal + shipping
            })
        }
    }, [cartProd, handleCosts]);

    /**
     * OBTENER PRODUCTO.
     */
    useEffect(() => {
        calculateCosts();
    }, [cartProd]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.amount}>{formatPrice(costs.subtotal)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Envío</Text>
                <Text style={[styles.amount, styles.positive]}>+ {formatPrice(costs.shipping)}</Text>
            </View>
            <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalAmount}>{formatPrice(costs.total)}</Text>
            </View>
            <View style={styles.protectionContainer}>
                <Icon name="verified-user" size={20} color={theme.colors.custom_green_dark} />
                <View style={styles.protectionTextContainer}>
                    <Text style={styles.protectionTitle}>Compra protegida</Text>
                    <Text style={styles.protectionDescription}>
                        Te devolvemos el 100% del dinero si no recibes tu producto.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        padding: 4
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        fontFamily: Fonts.DMSansRegular,
        color: theme.colors.custom_blue
    },
    amount: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue
    },
    positive: {
        color: theme.colors.custom_green_dark
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
        marginTop: 10,
    },
    totalText: {
        fontSize: 30,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue,
    },
    totalAmount: {
        fontSize: 30,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_green_dark,
    },
    protectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    protectionTextContainer: {
        marginLeft: 10,
    },
    protectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_green_dark
    },
    protectionDescription: {
        fontSize: 16,
        fontFamily: Fonts.DMSansRegular,
        color: theme.colors.custom_blue
    }
});
