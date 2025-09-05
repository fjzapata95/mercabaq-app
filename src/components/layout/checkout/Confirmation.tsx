import { Fonts } from '@core/constants/fontsContans';
import { theme } from '@core/theme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { Summary } from '@components/card/Summary';
import { Costs } from '@core/interfaces/cart.interfaces';

// REDUX
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { formatPrice } from '@core/utils/format';

interface Props {
    handleCosts: (costs: Costs) => void;
}

export const Confirmation = ({ handleCosts }: Props) => {

    const { cartProd } = useSelector(({ cart }: ReduxState) => ({
        cartProd: cart.items
    }), shallowEqual);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resumen del pedido:</Text>
            <Divider style={styles.divider} />
            {cartProd.map(product => (
                <View>
                    <View style={styles.productContainer}>
                        <View style={styles.containerImg}>
                            <Image
                                source={{ uri: product.image }}
                                style={styles.imageProd}
                                resizeMode="cover"
                            />
                            <View style={styles.cantContainer}>
                                <Text style={styles.listItemText}>{product.quantity}</Text>
                            </View>
                        </View>
                        <View style={{paddingHorizontal: 12, paddingVertical: 6, width: 240}}>
                            <Text style={styles.nameProd} numberOfLines={1} ellipsizeMode="tail">
                                {product.name}
                            </Text>
                            <Text style={styles.price}>
                                {formatPrice(product.price)}
                            </Text>
                        </View>
                    </View>
                    <Divider style={styles.divider} />
                </View>
            ))}
            {/**  */}
            <Summary handleCosts={handleCosts} />
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        // padding: 16
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_green_dark,
        marginBottom: 4,
    },
    divider: {
        marginVertical: 6
    },
    productContainer: {
        marginVertical: 6,
        flexDirection: 'row'
    },
    containerImg: {
        width: 73,
        height: 65,
        backgroundColor: theme.colors.custom_grey_light
    },
    cantContainer: {
        position: 'absolute',
        top: 6,
        right: 6,
        borderRadius: 50,
        width: 24,
        height: 24,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.custom_blue
    },
    listItemText: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.surface
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
        fontSize: 20,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue,
        marginTop: 4
    }
});