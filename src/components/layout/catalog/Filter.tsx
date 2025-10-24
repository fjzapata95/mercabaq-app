import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, List, Modal, Portal, Text } from 'react-native-paper';
import { theme } from '@core/theme';
import apiHelpers from '@core/auth/apiHelpers';
import { Fonts } from '@core/constants/fontsContans';
import { Filters } from '@core/interfaces/catalog.interfaces';
import { Category, CategoryResponse } from '@core/interfaces/caregory.interfaces';
import { Seller, SellerResponse } from '@core/interfaces/seller.interfaces';

import ButtonCustom from '@components/form/ButtonCustom';
import CheckboxInput from '@components/form/CheckboxInput';
import { NotFound } from '@components/NotFound';
import { LoandingPage } from '@components/LoandingPage';

// REDUX
import { useDispatch } from 'react-redux';
import { handleFilter } from '@core/root-store/actions/filter.action';

interface Props {
    filters: Filters;
    visible: boolean;
    admin?: boolean;
    handleToggleFilter: (value: boolean) => void;
    onChangeFilter: (field: string, value: any) => void
}

export const CatalogFilter = ({ filters, visible, admin = false, handleToggleFilter, onChangeFilter }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
        categoria: false,
        vendedor: false,
        marca: false,
        envio: false,
        precio: false
    });

    const [expandedId, setExpandedId] = useState<any>(undefined);
    const handlePress = (expandedId: string | number) => {
        setExpandedId((current: string | number) =>
            current === expandedId ? undefined : expandedId
        );
        setExpanded((prev) => ({
            ...prev,
            [expandedId]: !prev[expandedId],
        }));
    };

    const [categories, setCategories] = useState<Category[]>([]);
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [loadingCat, setLoadingCat] = useState<boolean>(true);
    const [loadingSeller, setLoadingSeller] = useState<boolean>(true);
    const [selectedCateries, setSelectedCateries] = useState<number[]>(filters.categorias);
    const [selectedSellers, setSelectedCSellers] = useState<number[]>(filters.vendedores);

    /**
     * OBTENER LISTADO DE CATEGORÍAS
     */
    const loadCategories = async () => {
        // LOANDING
        setLoadingCat(true);
        try {
            const { data: { data, error } } = await apiHelpers.get<CategoryResponse>('categoria/producto-count');
            // VALOR POR DEFECTO
            let result: Category[] = [];
            // VALIDAR SI SE OBTUVIERON DATOS
            if (!error) result = data;
            // ASIGNAR DATOS
            setCategories(result);
            setLoadingCat(false);
        } catch (error) {
            setCategories([]);
            setLoadingCat(false);
            console.error(error);
        }
    };

    /**
     * OBTENER LISTADO DE VENDEDORES
     */
    const loadSellers = async () => {
        // LOANDING
        setLoadingSeller(true);
        try {
            const { data: { data, error } } = await apiHelpers.get<SellerResponse>('negocio/getvendpag', { params: { page: 1 } });
            // VALOR POR DEFECTO
            let result: Seller[] = [];
            // VALIDAR SI SE OBTUVIERON DATOS
            if (!error) result = data.data;
            // ASIGNAR DATOS
            setSellers(result);
            setLoadingSeller(false);
        } catch (error) {
            setSellers([]);
            setLoadingSeller(false);
            console.error(error);
        }
    };

    /**
     * 
     * @param value 
     */
    const handleCategoryChange = (value: number) => {
        setSelectedCateries((prevValues) => {
            if (prevValues.includes(value)) {
                return prevValues.filter((item) => item !== value);
            } else {
                return [...prevValues, value];
            }
        });
    };

    /**
     * 
     * @param value 
     */
    const handleSellerChange = (value: number) => {
        setSelectedCSellers((prevValues) => {
            if (prevValues.includes(value)) {
                return prevValues.filter((item) => item !== value);
            } else {
                return [...prevValues, value];
            }
        });
    };

    /**
     * APLICAR FILTROS
     */
    const handleApplyFilters = useCallback(() => {
        // ASIGNAR FILTROS
        onChangeFilter('categorias', selectedCateries);
        onChangeFilter('vendedores', selectedSellers);
        // CERRAR FILTERS
        handleToggleFilter(false);
    }, [selectedCateries, selectedSellers]);

    /**
     * RESET FILTROS
     */
    const handleClearFilters = () => {
        setSelectedCateries([]);
        onChangeFilter('categorias', []);
        if(!admin) {
            //
            dispatch(handleFilter({ category: null }))
            // RESET VENDEDOR
            onChangeFilter('vendedores', [])
        };
        // CERRAR FILTERS
        handleToggleFilter(false);
    }
    
    useEffect(() => {
        loadCategories();
        loadSellers();
    }, []);

    return (
        <Portal theme={theme}>
            <Modal visible={visible} onDismiss={() => handleToggleFilter(false)} contentContainerStyle={styles.modal}>
                <View>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Filtrar por:</Text>
                        <IconButton icon="close" onPress={() => handleToggleFilter(false)} />
                    </View>

                    <List.AccordionGroup
                        onAccordionPress={handlePress}
                        expandedId={expandedId}
                    >
                        <List.Accordion
                            id={'categoria'}
                            title="Categorías"
                            titleStyle={[
                                styles.listTitle,
                                expanded['categoria'] ? styles.listTitleActive : null
                            ]}
                            rippleColor={'transparent'}
                        >
                            <View style={{marginHorizontal: 10}}>
                                {categories && categories.map(obj => (
                                    <CheckboxInput key={`categoy_${obj.id}`} value={obj.id} isChecked={filters.categorias.includes(obj.id)} onChangeText={handleCategoryChange} style={styles.itemText}>
                                        {obj.name} {obj.count ? `(${obj.count})` : '(0)'}
                                    </CheckboxInput>
                                ))}
                                {/* CONTENEDEDOR - LOANDING */}
                                {loadingCat && (
                                    <LoandingPage size={30} color={theme.colors.primary} text={'Cargando categorías...'} textStyle={{color: theme.colors.custom_blue}} />
                                )}
                                {/**
                                 * NOTFOUNT
                                */}
                                {!loadingCat && Object.keys(categories).length == 0 && (
                                    <NotFound text={'No se encontraron categorías'} />
                                )}
                            </View>
                        </List.Accordion>
                        { !admin && (
                            <List.Accordion
                                id={'vendedor'}
                                title="Vendedor"
                                titleStyle={[
                                    styles.listTitle,
                                    expanded['vendedor'] ? styles.listTitleActive : null
                                ]}
                                rippleColor={'transparent'}
                            >
                                <View style={{marginHorizontal: 10}}>
                                    {sellers && sellers.map(obj => (
                                        <CheckboxInput key={`seller_${obj.user}`}value={obj.user} isChecked={filters.vendedores.includes(obj.user)} onChangeText={handleSellerChange} style={styles.itemText}>
                                            {obj.nombreMostrar}
                                        </CheckboxInput>
                                    ))}
                                    {/* CONTENEDEDOR - LOANDING */}
                                    {loadingSeller && (
                                        <LoandingPage size={30} color={theme.colors.primary} text={'Cargando vendedores...'} textStyle={{color: theme.colors.custom_blue}} />
                                    )}
                                    {/**
                                     * NOTFOUNT
                                    */}
                                    {!loadingSeller && Object.keys(sellers).length == 0 && (
                                        <NotFound text={'No se encontraron vendedores'} />
                                    )}
                                </View>
                            </List.Accordion>
                        )}
                    </List.AccordionGroup>

                    <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}} >
                        <ButtonCustom
                            compact
                            mode={'outlined'}
                            style={{
                                borderRadius: 20,
                                borderColor: theme.colors.custom_green_dark,
                                width: 150,
                                marginRight: 2
                            }}
                            contentStyle={{
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: theme.colors.custom_green_dark
                            }}
                            textColor={theme.colors.custom_green_dark}
                            onPress={handleClearFilters}
                        >
                            Limpiar
                        </ButtonCustom>
                        <ButtonCustom
                            compact
                            mode={'contained'}
                            style={{
                                width: 150,
                                marginLeft: 2
                            }}
                            textColor={theme.colors.surface}
                            buttonColor={theme.colors.custom_blue}
                            onPress={handleApplyFilters}
                        >
                            Aplicar
                        </ButtonCustom>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};
  
const styles = StyleSheet.create({
    modal: {
        backgroundColor: theme.colors.background,
        borderRadius: 4,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_green_dark
    },
    listTitle: {
        fontSize: 18,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_grey
    },
    listTitleActive: {
        color: theme.colors.custom_blue
    },
    itemText: {        
        color: theme.colors.custom_grey,
        fontFamily: Fonts.ManropeMedium,
        fontSize: 16
    },
});