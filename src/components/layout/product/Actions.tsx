import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput as Input, Text } from 'react-native-paper';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import ButtonCustom from '@components/form/ButtonCustom';
import TextInput from '@components/form/TextInput';
import { Product } from '@core/interfaces/products.interfaces';
// REDUX
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { addItemToCart } from '@core/root-store/actions/cart.action';
import { showAlert } from '@core/root-store/actions/util.action';

interface Props {
    item: Product
}

export const ProductActions = ({ item }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const { cartProd } = useSelector(({ cart }: ReduxState) => ({
        cartProd: cart.items
    }), shallowEqual);

    // Estado local para manejar la cantidad
    const [quantity, setQuantity] = useState<number>(1);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };
    /**
     * ADICIONAR/MODIFICAR PRODUCTO
     */
    const handleAddToCart = useCallback(() => {
        // Obtener el/los seller(s) actuales en el carrito
        const sellersInCart = Array.isArray(cartProd)
        ? Array.from(new Set(cartProd.map(p => p.seller).filter(Boolean)))
        : [];
        // Tomar el primer seller como el actual
        const currentSeller = sellersInCart[0] ?? null;

        // 2) Si el carrito está vacío o coincide el seller → agregar
        if (sellersInCart.length === 0 || currentSeller === item.seller) {
            // ADICIONAR O MODIFICAR PRODUCTO.
            dispatch(addItemToCart({...item, quantity: quantity}));
        } else {
            // Mostrar mensaje de error o advertencia
            dispatch(showAlert({show: true, message: 'No puedes agregar productos de diferentes vendedores. Vacía el carrito antes de agregar este producto.', type: 'error'}));
        }
    }, [item, quantity]);

    useEffect(() => {
        if (item && item.id && cartProd) {
            // Comprobar si el producto ya está en el carrito.
            const productInCart = cartProd.find(product => product.id === item.id);
            // SE VALIDA SI EL PRODUCTO SE ENCUENTRA AGREGADO.
            if (productInCart) setQuantity(productInCart.quantity);
        }
    }, [cartProd, item.id]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cantidad:</Text>
            <View style={styles.containerActions}>
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
                        marginRight: 12
                    }}
                    value={String(quantity)}
                    keyboardType="numeric"
                    left={ <Input.Icon icon={'minus'} color={theme.colors.custom_green_dark} onPress={() => handleQuantityChange(quantity - 1)} /> }
                    right={ <Input.Icon icon={'plus'} color={theme.colors.custom_green_dark} onPress={() => handleQuantityChange(quantity + 1)} /> }
                    onChangeText={(text) => handleQuantityChange(Number(text))}
                />
                <ButtonCustom
                    mode='contained'
                    style={{
                        width: 'auto',
                        borderRadius: 30,
                    }}
                    contentStyle={{
                        padding: 2
                    }}
                    buttonColor={theme.colors.custom_blue}
                    textColor={theme.colors.surface}
                    onPress={handleAddToCart}
                >
                    Agregar al carrito
                </ButtonCustom>
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12
    },
    containerActions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontFamily: Fonts.DMSansSemiBold,
        color: theme.colors.custom_blue,
        marginVertical: 4
    }
});