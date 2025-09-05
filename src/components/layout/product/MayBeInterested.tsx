import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '@core/navigation';
import apiHelpers from '@core/auth/apiHelpers';
import { Text } from 'react-native-paper';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import { LoandingPage } from '@components/LoandingPage';
import { ProductCard } from '@components/card/ProductCard';
import { Product, ProductsResponse } from '@core/interfaces/products.interfaces';

const { width } = Dimensions.get('window');

interface Props extends NativeStackScreenProps<StackParams> {item: Product}

export const MayBeInterested = (props: Props) => {

    const [produts, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * OBTENER LISTADO DE PRODUCTOS DE LA MISMA CATEGORIA
     */
    const loadProducts = useCallback(async () => {
        // LOANDING
        setLoading(true);
        try {
            const { categoria } = props.item;
            // VALIDAR ID DEL PRODUCTO
            if (categoria && categoria !== 0) {
                // OBTENER PRODUCTOS
                const { data: { data } } = await apiHelpers.get<ProductsResponse>('producto/getPag', { params: { page : 1, categorias: categoria}});
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
            <Text style={styles.text}>Te puede interesar</Text>
            <View style={styles.containerProd}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {produts.map((obj) => (
                        <View style={styles.productContainer}>
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