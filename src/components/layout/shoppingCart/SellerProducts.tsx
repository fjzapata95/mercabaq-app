import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Avatar, Divider, Text } from 'react-native-paper';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import { ProductsCart } from './ProductsCart';
import { Style } from '@core/styles';
import { GroupedProducts } from '@core/interfaces/cart.interfaces';

export const SellerProductsCart = ({ seller, sellerId, products }: GroupedProducts) => {
    return (
        <View key={`shoppint_seller_${sellerId}`} style={styles.container}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                <Avatar.Icon
                    size={52}
                    icon="account-circle"
                    style={styles.avatar}
                    color="#D3D3D3"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.sellerName} numberOfLines={2}>{seller}</Text>
                    <View style={styles.verifiedContainer}>
                        <Text style={styles.verifiedText}>Verificado</Text>
                        <Image source={require("@assets/icons/check-verified.png")} style={{width: 24, height: 24}} />
                    </View>
                </View>
            </View>

            <Divider style={{marginVertical: 10}} />
            {/** PRODUCTOS DEL VENDEDOR */}
            {products && products.map(item => (
                <ProductsCart product={item} />
            ))}
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
        padding: 12,
        margin: 12,
        ...Style.shadowStyle
    },
    avatar: {
        backgroundColor: '#D3D3D3'
    },
    textContainer: {
        marginLeft: 14,
        paddingVertical: 4
    },
    sellerName: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue,
    },
    verifiedContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    verifiedText: {
        fontSize: 16,
        fontFamily: Fonts.DMSansRegular,
        color: theme.colors.custom_green_dark,
        marginRight: 2
    },
    button: {
        borderRadius: 10,
        borderColor: theme.colors.custom_green_dark
    }
});