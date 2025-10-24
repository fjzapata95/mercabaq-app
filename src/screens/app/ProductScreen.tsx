import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Divider } from 'react-native-paper';
import { StackParams } from '@core/navigation';
import apiHelpers from '@core/auth/apiHelpers';
import { theme } from '@core/theme';
import uuid from 'react-uuid';

import { ProductHeader } from '@components/layout/product/Header';
import { ProductInfo } from '@components/layout/product/Info';
import { ProductBanner } from '@components/layout/product/ProductBanner';
import { SellerInfo } from '@components/layout/product/Seller';
import { ProductActions } from '@components/layout/product/Actions';
import { ProductOverview } from '@components/layout/product/Overview';
import { SellerProducts } from '@components/layout/product/SellerProducts';
import { MayBeInterested } from '@components/layout/product/MayBeInterested';
import { Product, ProductIdResponse } from '@core/interfaces/products.interfaces';

const productState: Product = {
    id: 1,
    name: '',
    seller: 1,
    price: '',
    image: '',
    rating: 0,
    freeShipping: true,
    stock: '',
    um: '',
    isFavorite: false,
    reviewCount: '',
    status: false,
    descripcion: '',
    brand: 0,
    categoria: 0,
    nombrecategoria: '',
    tipoenvio: '',
    nombremarca: '',
    UserModel: {
        name: ''
    },
    MiNegocioModel: {
        nombreMostrar: ''
    },
    disponible: '',
    vendedor: ''
}

interface Props extends NativeStackScreenProps<StackParams> {}

export const ProductScreen = (props: Props) => {

    const [product, setProduct] = useState<Product>(productState);

    /**
     * MÉTODO PARA OBTENER PRODUCTO.
     */
    const getProductById = useCallback(async () => {
        //
        try {
            const { params }: any = props.route;
            // VALIDAR ID DEL PRODUCTO
            if (params && params.id) {
                // OBTENER PRODUCTO POR ID.
                const { data: { data } } = await apiHelpers.get<ProductIdResponse>(`producto/get/${params['id']}`);

                console.log('GET PRODUCT ID - DATA: ', data);
                // ASIGNACIÓN DE DATOS.
                setProduct(data);
            }
        } catch (error) {
            //
            console.log('GET PRODUCT ID - ERROR: ', error, typeof error);
            // ASIGNACIÓN DE DATOS POR DEFECTO.
            setProduct(productState);
        }
    }, [props.route.params]);
    
    /**
     * OBTENER PRODUCTO.
     */
    useEffect(() => { getProductById(); }, [props.route.params]);
    
    return (
        <View style={{flex: 1}}>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    key={uuid()}
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={styles.contentScroll}
                >
                    {/** HEADER PRODUCTO */}
                    <ProductHeader {...props}/>
                    {/** SLIDER PRODUCTO */}
                    <ProductBanner {...props} product={product} />
                    {/** INFO DEL PRODUCTO */}
                    <ProductInfo item={product}/>

                    <Divider style={styles.dividerItem} />

                    {/** OPCIONES DEL PRODUCTO */}
                    {/** <ProductOptions /> */}
                    {/** ACTION - CANTIDAD CART */}
                    <ProductActions item={product}/>

                    <Divider style={styles.dividerItem} />
                    
                    {/** INFO DEL VENDEDOR */}
                    <SellerInfo item={product}/>
                    {/** INFO GENERAL DEL PRODUCTO */}
                    <ProductOverview item={product}/>
                    {/** PRODUCTOS DEL VENDEDOR */}
                    <SellerProducts {...props} item={product}/>
                    {/** PRODUCTOS DE INTERES */}
                    <MayBeInterested {...props} item={product}/>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentScroll: {
        flexGrow: 1,
        paddingBottom: 20,
        backgroundColor: theme.colors.background
    },
    dividerItem: {
        marginVertical: 5, marginHorizontal: 12
    }
});
