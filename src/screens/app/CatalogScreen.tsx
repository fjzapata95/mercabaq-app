import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '@core/navigation';
import apiHelpers from '@core/auth/apiHelpers';
import axios from 'axios';
//
import { theme } from '@theme';

// COMPONENTS
import { MainHeader } from '@components/MainHeader';
import { CatalogHeader } from '@components/layout/catalog/Header';
import { CatalogFilter } from '@components/layout/catalog/Filter';
// import { SortCatalog } from '@components/layout/catalog/Sort';
import { ProductCard } from '@components/card/ProductCard';
import { LoandingPage } from '@components/LoandingPage';
import { NotFound } from '@components/NotFound';
// 
import { Data, Product, ProductsResponse } from '@core/interfaces/products.interfaces';
import { Filters } from '@core/interfaces/catalog.interfaces';
import { PriceRangeCatalog } from '@components/layout/catalog/PriceRange';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxState } from '@core/interfaces/redux.interfaces';

interface Props extends NativeStackScreenProps<StackParams, any> {}

export const CatalogScreen = (props: Props) => {

    const { filterCat } = useSelector(({ filter }: ReduxState) => ({
        filterCat: filter
    }), shallowEqual);
    
    const [toggleFilter, onToggleFilter] = useState<boolean>(false);
    const [togglePriceRange, onTogglePriceRange] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [filters, onFilters] = useState<Filters>({
        page: 0,
        filtro: '',
        categorias: [],
        vendedores: [],
        tiposEnvio: [],
        precioMin: 0,
        precioMax: 1000000
    });
    const [productsState, setProductsState] = useState<Data>({
        data: [],
        total: 0,
        currentPage: 0,
        pages: 0
    });
    // REFERENCIA PARA LES PETICIONES.
    const productsReqRef: any = useRef<any>(null);

    /**
     * MÉTODO PARA OBTENER EL LISTADO DE PRODUCTOS.
     */
    const getProducts = useCallback(async () => {
        //
        try {
            // OBTENER DATOS.
            const { page, filtro } = filters;
            // VALIDAR QUE SEA LA PRIMERA PAGINA.
            if (page === 1) setIsLoading(true);
            // REQUEST CURRENT - VALIDACIÓN PARA LAS PETICIONES REPETIDAS.
            productsReqRef && productsReqRef.current && productsReqRef.current();
            // TOKEN PARA LAS PETICIONES.
            const { CancelToken } = axios;
            // OBTENER LISTADO DE PRODUCTOS.
            const { data: { data } } = await apiHelpers.get<ProductsResponse>('producto/getPag', {
                params: { 
                    ...filters,
                    vendedores: filters.vendedores.toString(),
                    categorias: filters.categorias.toString()
                },
                cancelToken: new CancelToken(c => {
                    productsReqRef.current = c;
                })
            });
            // OBTENER LISTADO DE PRODUCTOS EN MEMORIA. 
            const state = productsState;
            // ASIGNACIÓN DE DATOS.
            setProductsState((params) => ({
                ...params,
                data: page === 1 || filtro ? data.data : [...state.data, ...data.data],
                total: data.total,
            }));
            setIsLoading(false);
            setIsFetching(false);
        } catch (error) {
            //
            console.log('GET PRODUCTS - ERROR: ', error, typeof error);
            // 
            setIsLoading(false);
            setIsFetching(false);
        }
    }, [filters]);
    /**
     * 
     */
    const onScroll = useCallback(() => {
        // SE VALIDA QUE NO SE ESTE HACIENDO UNA BÚSQUEDA.
        if (!filters.filtro) {
            setIsFetching(true);
            // OBTENER PAGINA ACTUAL
            const { page } = filters;
            // ASIGNAR NUEVA PAGINA AL FILTRO.
            onFilters((filters) => ({
                ...filters,
                page: page + 1
            }));
        }
    }, [filters]);
    /**
     * 
     */
    const onRefresh = () => {
        setIsFetching(true);
        // ASIGNAR NUEVA PAGINA AL FILTRO.
        onFilters((filters) => ({
            ...filters,
            page: 1
        }));
    };
    /**
     * 
     * @param value 
     * @param field 
     */
    const onChangeFilter = (field: string, value: any) => {
        // 
        onFilters((filters) => ({
            ...filters,
            [field]: value,
            page: 1 // POR DEFECTO - CUALQUIER CAMBIO EN EL FILTRO SE DEVUELVE A LA PAGINA 1
        }));
    }

    /**
     * OBTENER LISTADO DE PRODUCTOS.
     */
    useEffect(() => { getProducts(); }, [filters]);

    /**
     * FILTRO BUSQUEDA Y CATEGORIA
     */
    useEffect(() => {
        onChangeFilter('filtro', filterCat.search);
        onChangeFilter('categorias', (filterCat.category) ? [filterCat.category] : []);
    }, [filterCat]);

    /**
     * OBTENER LISTADO DE PRODUCTOS.
     */
    useEffect(() => { getProducts(); }, []);

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.productContainer}>
            <ProductCard {...props} item={item}/>
        </View>
    );

    return (
        <View style={styles.container}>
            {/** HEADER - OPTIONS FILTERS */}
            <CatalogHeader handleToggleFilter={onToggleFilter} handleToggleSort={onTogglePriceRange} {...props}/>

            <View style={styles.container}>
                <FlatList
                    data={productsState.data}
                    keyExtractor={(item, index) => `catalog_${item.id}-${index}`}
                    renderItem={renderItem}
                    numColumns={2}
                    style={{
                        backgroundColor: theme.colors.background
                    }}
                    columnWrapperStyle={styles.columnWrapper}
                    showsVerticalScrollIndicator={false}
                    refreshing={isFetching}
                    onRefresh={onRefresh}
                    onEndReached={onScroll}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    ListEmptyComponent={() => <NotFound text={'No se encontraron productos'} />}
                />
                {/* CONTENEDEDOR - LOANDING */}
                {isLoading && (
                    <LoandingPage
                        size={100}
                        color={theme.colors.primary}
                        background={theme.colors.background}
                    />
                )}
            </View>

            {/** COMPONENT - FILTRO DE CATALOGO */}
            <CatalogFilter filters={filters} visible={toggleFilter} handleToggleFilter={onToggleFilter} onChangeFilter={onChangeFilter} />
            {/** COMPONENT - ORDENAMIENTO DE CATALOGO */}
            {/* <SortCatalog visible={toggleSort} handleToggleSort={onToggleSort} /> */}
            {/** COMPONENT - RANGO DE PRECIO */}
            <PriceRangeCatalog filters={filters} visible={togglePriceRange} handleTogglePriceRange={onTogglePriceRange} onChangeFilter={onChangeFilter} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productContainer: {
        flex: 1
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 12
    }
});
