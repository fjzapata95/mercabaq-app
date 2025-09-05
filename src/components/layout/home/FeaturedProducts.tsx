import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import apiHelpers from '@core/auth/apiHelpers';
import { Text } from 'react-native-paper';
import { theme } from '@core/theme';

import { Fonts } from '@core/constants/fontsContans';
import { StackParams } from '@core/navigation';
import { LoandingPage } from '@components/LoandingPage';
import { ProductCard } from '@components/card/ProductCard';
import { Product, ProductsResponse } from '@core/interfaces/products.interfaces';
import { NotFound } from '@components/NotFound';

interface Props extends NativeStackScreenProps<StackParams> {}

export const FeaturedProducts = (props: Props) => {

    const [produts, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * OBTENER LISTADO DE PRODUCTOS DETACADOS
     */
    const loadProducts = async () => {
        // LOANDING
        setLoading(true);
        try {
            const { data: { data, error } } = await apiHelpers.get<ProductsResponse>('producto/getPdPag', { params: { page : 1}});
            // VALOR POR DEFECTO
            let result: Product[] = [];
            // VALIDAR SI SE OBTUVIERON DATOS
            if (!error) result = data.data;
            // ASIGNAR DATOS
            setProducts(result);
            setLoading(false);
        } catch (error) {
            setProducts([]);
            setLoading(false);
            console.error(error);
        }
    };

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.productContainer}>
            <ProductCard {...props} item={item}/>
        </View>
    );

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <View style={styles.containerProd}>
            <View style={styles.containerprodHed}>
                <Text variant="titleLarge" style={styles.title}>
                    Productos destacados
                </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('catalog')} style={{flexDirection: 'row'}}>
                    <Text style={styles.viewMore}>Ver productos</Text>
                    <Icon name={'chevron-right'} size={22} color={theme.colors.custom_green_dark}/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={produts}
                keyExtractor={(item, index) => `featured_${item.id}-${index}`}
                renderItem={renderItem}
                numColumns={2}
                style={{
                    backgroundColor: theme.colors.background
                }}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
            {/* CONTENEDEDOR - LOANDING */}
            {loading && (
                <LoandingPage size={30} color={theme.colors.primary} text={'Cargando Productos...'} textStyle={{color: theme.colors.custom_blue}} />
            )}
            {/**
             * NOTFOUNT
            */}
            {!loading && Object.keys(produts).length == 0 && (
                <NotFound text={'No se encontraron productos'} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    containerProd: {
        marginBottom: 16,
        marginTop: 10,
        backgroundColor: theme.colors.background
    },
    containerprodHed: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue
    },
    viewMore: {
        fontSize: 17,
        fontFamily: Fonts.DMSansRegular,
        color: theme.colors.custom_green_dark
    },
    scrollContentprod: {
        paddingHorizontal: 0
    },
    productContainer: {
        flex: 1,
        maxWidth: '50%'
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 12
    }
});