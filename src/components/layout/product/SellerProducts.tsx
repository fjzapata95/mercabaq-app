import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { StackParams } from '@core/navigation';
import { Text } from 'react-native-paper';
import uuid from 'react-uuid';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import { LoandingPage } from '@components/LoandingPage';
import { ProductCard } from '@components/card/ProductCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product, ProductsResponse } from '@core/interfaces/products.interfaces';
import apiHelpers from '@core/auth/apiHelpers';

const { width } = Dimensions.get('window');

interface Props extends NativeStackScreenProps<StackParams> {item: Product}

export const SellerProducts = (props: Props) => {

    const [produts, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * OBTENER LISTADO DE PRODUCTOS DEL VENDEDOR
     */
    const loadProducts = useCallback(async () => {
        // LOANDING
        setLoading(true);
        try {
            const { seller } = props.item;
            // VALIDAR ID DEL PRODUCTO
            if (seller && seller !== 0) {
                // OBTENER PRODUCTOS
                const { data: { data } } = await apiHelpers.get<ProductsResponse>('producto/getPag', { params: { page : 1, vendedores: seller}});
                // ASIGNAR DATOS
                setProducts(data.data);
            }
            setLoading(false);
        } catch (error) {
            setProducts([]);
            setLoading(false);
            console.error(error);
        }
    }, [props.item]);
        
    /**
     * OBTENER PRODUCTO.
     */
    useEffect(() => { loadProducts(); }, [props.item]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Productos de</Text>
            <Text style={styles.seller}>{props.item.vendedor}</Text>
            <View style={styles.containerProd}>
                <ScrollView
                    key={uuid()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {(produts || []).map((obj) => (
                        <View style={styles.productContainer} key={`content-detail-product-${obj.id}`}>
                            <ProductCard {...props} item={obj}/>
                        </View>
                    ))}
                </ScrollView>
                {/**
                 * LOANING
                */}
                {loading && (
                    <LoandingPage size={30} color={theme.colors.primary} text={'Cargando Productos...'} textStyle={{color: theme.colors.custom_blue}} />
                )}
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 14,
        marginVertical: 8
    },
    text: {
        fontSize: 20,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue
    },
    seller: {
        fontSize: 20,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_green_dark
    },
    containerProd: {
        marginVertical: 12
    },
    scrollContent: {
        paddingHorizontal: 0
    },
    productContainer: {
        flex: 1,
        minWidth: width * 0.5,
        maxWidth: width * 0.5
    }
});