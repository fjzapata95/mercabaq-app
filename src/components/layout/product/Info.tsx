import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-paper';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import { Product } from '@core/interfaces/products.interfaces';
import { formatPrice } from '@core/utils/format';

interface Props {
    item: Product
}

export const ProductInfo = ({ item }: Props) => {
    return (
        <View style={styles.containerProd}>
            <Text style={{
                fontSize: 16,
                fontFamily: Fonts.ManropeMedium,
                color: theme.colors.custom_green_dark,
                textDecorationLine: 'underline',
                marginBottom: 4
            }} numberOfLines={1}>
                {item.vendedor}
            </Text>
            <Text style={styles.nameProd} numberOfLines={3}>
                {item.name}
            </Text>
            <View style={styles.containerRac}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                        key={star}
                        name={star <= item.rating ? 'star' : 'star-outline'}
                        size={21}
                        color={star <= item.rating ? theme.colors.custom_green_dark : '#E6E6E6'}
                        style={styles.star}
                    />
                ))}
                <Text style={styles.reviewCount}>({item.reviewCount})</Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 2, alignItems: 'flex-end'}}>
                <Text style={styles.price}>
                    {formatPrice(item.price)}
                </Text>
                <Text style={styles.unidad}>
                    / {item.um}
                </Text>
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    containerProd: {
        paddingTop: 12,
        paddingHorizontal: 12
    },
    nameProd: {
        fontSize: 20,
        fontFamily: Fonts.ManropeSemibold,
        color: theme.colors.custom_blue,
        marginBottom: 4
    },
    price: {
        fontSize: 35,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_green_dark
    },
    unidad: {
        fontSize: 14,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_grey,
        marginBottom: 8
    },
    containerRac: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    star: {
        marginRight: 2,
    },
    reviewCount: {
        fontSize: 13,
        fontFamily: Fonts.ManropeMedium,
        color: theme.colors.custom_grey,
        marginLeft: 4
    }
});