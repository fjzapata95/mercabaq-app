import React, { useCallback } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import IconFeather from 'react-native-vector-icons/FontAwesome';
import { TextInput as Input, Text } from 'react-native-paper';
import TextInput from '@components/form/TextInput';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import { CartProduct } from '@core/interfaces/cart.interfaces';
import { formatPrice } from '@core/utils/format';
// REDUX
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '@core/root-store/actions/cart.action';

interface Props {
    product: CartProduct
}

export const ProductsCart = ({ product }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();
    
    /**
     * MANEJADOR DEL PRODUCTO
     */
    const handleQuantityChange = useCallback((newQuantity: number) => {
        if (newQuantity >= 1) {
            // MODIFICAR PRODUCTO.
            dispatch(addItemToCart({...product, quantity: newQuantity}));
        }
    }, [product]);
    
    return (
        <View style={styles.container} key={`card_product_${product.id}`}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.containerImg}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.imageProd}
                        resizeMode="cover"
                    />
                </View>
                <View style={{paddingHorizontal: 10, paddingVertical: 6, width: 200}}>
                    <Text style={styles.nameProd} numberOfLines={2} ellipsizeMode="tail">
                        {product.name}
                    </Text>
                    <Text style={styles.price}>
                        {formatPrice(product.price)}
                    </Text>
                    <View style={styles.containerActions}>
                        <TextInput 
                            textColor={theme.colors.custom_blue}
                            outlineStyle={{
                                borderColor: theme.colors.custom_green_dark
                            }}
                            contentStyle={{
                                fontSize: 18,
                                fontFamily: Fonts.ManropeBold
                            }}
                            style={{
                                marginRight: 12,
                                height: 40,
                                width: 120
                            }}
                            value={product.quantity.toString()}
                            keyboardType="numeric"
                            left={ <Input.Icon icon={'minus'} color={theme.colors.custom_green_dark} onPress={() => handleQuantityChange(product.quantity - 1)} /> }
                            right={ <Input.Icon icon={'plus'} color={theme.colors.custom_green_dark} onPress={() => handleQuantityChange(product.quantity + 1)} /> }
                            onChangeText={(text) => handleQuantityChange(Number(text))}
                        />
                        <TouchableOpacity
                            onPress={() => dispatch(removeItemFromCart(product.id))}
                        >
                            <IconFeather name={'trash-o'} size={24} color={theme.colors.custom_grey} style={{padding: 10}} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        marginVertical: 4
    },
    containerImg: {
        width: 133,
        height: 112,
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
        fontSize: 20,
        fontFamily: Fonts.DMSansSemiBold,
        color: theme.colors.custom_blue,
        marginTop: 4
    },
    containerActions: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});