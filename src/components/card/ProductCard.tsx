import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, TextInput as Input, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { theme } from '@core/theme';

import ButtonCustom from '@components/form/ButtonCustom';
import TextInput from '@components/form/TextInput';

import { Fonts } from '@core/constants/fontsContans';
import { StackParams } from '@core/navigation';
import { Product } from '@core/interfaces/products.interfaces';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { addItemToCart, removeItemFromCart } from '@core/root-store/actions/cart.action';
import { formatPrice } from '@core/utils/format';

const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla

interface Props extends NativeStackScreenProps<StackParams> {item: Product, admin?: boolean}

export const ProductCard = ({ item, admin = false, navigation }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const { cartProd } = useSelector(({ cart }: ReduxState) => ({
        cartProd: cart.items
    }), shallowEqual);
    
    // Estado local para manejar la cantidad del producto
    const [quantity, setQuantity] = useState<number>(1);
    const [productInCart, setProductInCart] = useState<boolean>(false);

    const getStockStyle = () => {
        // VALIDAR CANTIDAD
        if(item.stock < 10) return styles.lowStock;
        // DISPONIBLE
        return styles.outOfStock;
    };

    /**
     * MANEJADOR DEL PRODUCTO
     */
    const handleQuantityChange = useCallback((newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
            // MODIFICAR PRODUCTO.
            dispatch(addItemToCart({...item, quantity: newQuantity}));
        }
        // SI LLEGA A CERO, ELIMINA EL PRODUCTO
        if (newQuantity == 0) {
            // REMOVER PRODUCTO.
            dispatch(removeItemFromCart(item.id));
        }
    }, [item]);
    
    /**
     * ADICIONAR PRODUCTO
     */
    const handleAddToCart = useCallback(() => {
        // ADICIONAR O MODIFICAR PRODUCTO.
        dispatch(addItemToCart({...item, quantity: quantity}));
    }, [item, quantity]);
    
    useEffect(() => {
        if (item && item.id && cartProd) {
            // Comprobar si el producto ya está en el carrito.
            const productInCart = cartProd.find(product => product.id === item.id);
            // SE VALIDA SI EL PRODUCTO SE ENCUENTRA AGREGADO.
            if (productInCart) {
                // MOSTRAR INPUT
                setProductInCart(true);
                // AGREGAR CANTIDAD
                setQuantity(productInCart.quantity)
            } else {
                // OCULTAR INPUT
                setProductInCart(false);
            }
        }
    }, [cartProd, item.id]);
  
    return (
        <Card style={styles.card}>
            <View style={styles.containerImg}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('product', { id: item.id });
                    }}
                >
                    <Image
                        source={{ uri: item.image }}
                        style={styles.imageProd}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <IconButton
                    icon={item.isFavorite ? 'bookmark' : 'bookmark-outline'}
                    iconColor={theme.colors.custom_green_dark}
                    style={styles.favoriteButton}
                    // onPress={onFavorite}
                />
            </View>
            <Card.Content style={styles.containerProd}>
                <Text style={{
                    fontSize: 12,
                    fontFamily: Fonts.ManropeRegular,
                    color: theme.colors.custom_grey,
                    marginBottom: 4
                }} numberOfLines={1}>
                    {item.vendedor}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('product', { id: item.id });
                    }}
                >
                    <Text style={styles.nameProd} numberOfLines={1}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginVertical: 2, alignItems: 'flex-end'}}>
                    <Text style={styles.price}>
                        {formatPrice(item.price)}
                    </Text>
                    <Text style={styles.unidad}>
                        / {item.um}
                    </Text>
                </View>
                <View style={styles.containerRac}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                            key={star}
                            name={star <= item.rating ? 'star' : 'star-outline'}
                            size={16}
                            color={star <= item.rating ? theme.colors.custom_grey : '#E6E6E6'}
                            style={styles.star}
                        />
                    ))}
                    <Text style={styles.reviewCount}>({item.reviewCount})</Text>
                </View>
                <Text style={[styles.stockText, getStockStyle()]}>
                    {item.disponible}
                </Text>
            </Card.Content>
            {!admin ? (
                <Card.Actions style={{padding: 4}}>
                    {productInCart ? (
                        <TextInput 
                            textColor={theme.colors.custom_blue}
                            outlineStyle={{
                                borderColor: theme.colors.custom_green_dark
                            }}
                            contentStyle={{
                                justifyContent: 'center',
                                textAlign: 'center',
                                fontSize: 18,
                                fontFamily: Fonts.ManropeBold
                            }}
                            style={{
                                height: 40,
                                marginVertical: 16
                            }}
                            value={String(quantity)}
                            keyboardType="numeric"
                            left={ <Input.Icon icon={'minus'} color={theme.colors.custom_green_dark} onPress={() => handleQuantityChange(quantity - 1)} /> }
                            right={ <Input.Icon icon={'plus'} color={theme.colors.custom_green_dark} onPress={() => handleQuantityChange(quantity + 1)} /> }
                            onChangeText={(text) => handleQuantityChange(Number(text))}
                        />
                    ) : (
                        <ButtonCustom
                            mode='contained'
                            style={styles.button}
                            textColor={theme.colors.surface}
                            onPress={handleAddToCart}
                        >
                            Agregar
                        </ButtonCustom>
                    )}
                </Card.Actions>
            ) : (
                <Card.Actions style={{padding: 4}}>
                    <ButtonCustom
                        mode='contained'
                        style={styles.button}
                        textColor={theme.colors.surface}
                        onPress={() => navigation.navigate('updateproduct', {id: item.id})}
                    >
                        Editar
                    </ButtonCustom>
                </Card.Actions>
            )}
        </Card>
    );
};
  
const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        backgroundColor: theme.colors.background,
        marginHorizontal: 6,
        marginVertical: 2,
        overflow: 'hidden'
    },
    containerImg: {
        height: width * 0.4,
        backgroundColor: theme.colors.custom_grey_light
    },
    imageProd: {
        width: '100%',
        height: '100%'
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 0,
        margin: 4,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.custom_green_dark
    },
    containerProd: {
        paddingTop: 12,
        paddingHorizontal: 12
    },
    nameProd: {
        fontSize: 15,
        fontFamily: Fonts.ManropeSemibold,
        color: theme.colors.custom_blue,
        marginBottom: 4,
        height: 20
    },
    price: {
        fontSize: 20,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_blue
    },
    unidad: {
        fontSize: 14,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_grey,
        marginBottom: 4
    },
    stockText: {
        fontFamily: Fonts.ManropeMedium,
        fontSize: 13,
        marginTop: 4
    },
    lowStock: {
        color: theme.colors.custom_green_dark,
    },
    outOfStock: {
        color: theme.colors.custom_green_dark,
    },
    containerRac: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        marginRight: 2,
    },
    reviewCount: {
        fontSize: 13,
        fontFamily: Fonts.ManropeMedium,
        color: theme.colors.custom_grey,
        marginLeft: 4
    },
    containerButton: {
        marginHorizontal: 12
    },
    button: {
        borderRadius: 30,
        backgroundColor: theme.colors.custom_blue,
        color: theme.colors.surface
    }
});