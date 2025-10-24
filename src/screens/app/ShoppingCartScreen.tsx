import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import uuid from 'react-uuid';
//
import { theme } from '@theme';

import { AppBar } from '@components/AppBar';
import { StackParams } from '@core/navigation';
import { Fonts } from '@core/constants/fontsContans';
import { SellerProductsCart } from '@components/layout/shoppingCart/SellerProducts';
import { CartSummary } from '@components/layout/shoppingCart/CartSummary';
import { formatPrice } from '@core/utils/format';

import ButtonCustom from '@components/form/ButtonCustom';
import IconFeather from 'react-native-vector-icons/FontAwesome';

// REDUX
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { clearCart } from '@core/root-store/actions/cart.action';
import { CartProduct, Costs, GroupedProducts } from '@core/interfaces/cart.interfaces';
import { NotFound } from '@components/NotFound';

interface Props extends NativeStackScreenProps<StackParams> {}

export const ShoppingCartScreen = ({ navigation }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const { cartProd, isAuth } = useSelector(({ cart, auth }: ReduxState) => ({
        cartProd: cart.items,
        isAuth: auth.isAuth
    }), shallowEqual);
        
    const [costs, setCosts] = useState<Costs>({
        subtotal: 0.0000,
        shipping: 0.0000,
        total: 0.0000
    });

    /**
     * agrupar productos por vendedor
     * @param products 
     * @returns 
     */
    const groupProductsBySeller = (products: CartProduct[]): GroupedProducts[] => {
        const grouped = products.reduce((acc, product) => {
            const sellerId = product.vendedor;
            
            if (!acc[sellerId]) {
                acc[sellerId] = {
                    seller: product.vendedor,
                    sellerId: product.seller,
                    products: []
                };
            }
            
            acc[sellerId].products.push(product);

            return acc;
        }, {} as Record<string, GroupedProducts>);
        
        return Object.values(grouped);
    };

    /**
     * 
     */
    const goPay = useCallback(() => {
        if (!isAuth) {
            navigation.navigate('auth')
        } else {
            navigation.navigate('checkout')
        }
    }, [isAuth]);
    
    const renderItem = ({ item }: { item: any }) => (
        <SellerProductsCart {...item} key={uuid()}/>
    );
    
    return (
        <View style={styles.container}>
            <AppBar 
                title={
                    <View>
                        <Text style={{
                            fontSize: 25,
                            fontFamily: Fonts.DMSansBold,
                            color: theme.colors.surface
                        }}>
                            Mi Carrito
                        </Text>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: Fonts.DMSansLight,
                            color: theme.colors.surface
                        }}>
                            ({Object.keys(cartProd).length} artículos)
                        </Text>
                    </View>
                }
                navigation={navigation}
                children={<IconFeather onPress={() => dispatch(clearCart())} name={'trash-o'} size={24} color={theme.colors.custom_green_dark} style={{padding: 10}} />}
            />
            <View style={styles.container}>
                <FlatList
                    data={groupProductsBySeller(cartProd)}
                    keyExtractor={(item, index) => `shopping_${item.sellerId}-${index}`}
                    renderItem={renderItem}
                    numColumns={1}
                    style={{
                        backgroundColor: theme.colors.background
                    }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    ListEmptyComponent={() => <NotFound text={'No se encontraron productos'} />}
                />
                {/** MONTO DE LA COMPRA */}
                <CartSummary handleCosts={setCosts} />
                <View style={{backgroundColor: theme.colors.background, padding: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{marginRight: 4}}>
                        <Text style={styles.text}>Total:</Text>
                        <Text style={styles.amount}>{formatPrice(costs.total)}</Text>
                    </View>
                    <View style={{marginLeft: 4, paddingHorizontal: 8}}>
                        <ButtonCustom
                            mode='contained'
                            style={{
                                width: 140,
                                borderRadius: 30,
                            }}
                            buttonColor={theme.colors.custom_blue}
                            textColor={theme.colors.surface}
                            onPress={goPay}
                        >
                            Ir a pagar
                        </ButtonCustom>
                    </View>
                </View>

                {Object.keys(cartProd).length == 0 && (
                    <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background}}>
                        <IconFeather name="shopping-cart" size={100} color={theme.colors.backdrop} />
                        <Text style={{color: theme.colors.backdrop, fontSize: 18, textAlign: 'center'}}>Tu carrito está vacío. Agrega productos para continuar.</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentScroll: {
        flexGrow: 1,
        paddingBottom: 20
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
    }
});
