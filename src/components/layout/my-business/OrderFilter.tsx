import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, List, Modal, Portal, Text } from 'react-native-paper';
import { theme } from '@core/theme';
import apiHelpers from '@core/auth/apiHelpers';
import { Fonts } from '@core/constants/fontsContans';
import { OrderFilters, OrderStatus, OrderStatusResponse } from '@core/interfaces/order.interfaces';

import ButtonCustom from '@components/form/ButtonCustom';
import CheckboxInput from '@components/form/CheckboxInput';
import { NotFound } from '@components/NotFound';
import { LoandingPage } from '@components/LoandingPage';

interface Props {
    filters: OrderFilters;
    visible: boolean;
    handleToggleFilter: (value: boolean) => void;
    onChangeFilter: (field: string, value: any) => void
}

export const OrderFilter = ({ filters, visible, handleToggleFilter, onChangeFilter }: Props) => {

    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
        estado: false,
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

    const [status, setStatus] = useState<OrderStatus[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedStatu, setSelectedStatu] = useState<string>(filters.estado);

    /**
     * OBTENER LISTADO DE CATEGORÍAS
     */
    const loadCategories = async () => {
        // LOANDING
        setLoading(true);
        try {
            const { data: { data, error } } = await apiHelpers.get<OrderStatusResponse>('pedido/getcount');
            // VALOR POR DEFECTO
            let result: OrderStatus[] = [];
            // VALIDAR SI SE OBTUVIERON DATOS
            if (!error) result = data;
            // ASIGNAR DATOS
            setStatus(result);
            setLoading(false);
        } catch (error) {
            setStatus([]);
            setLoading(false);
            console.error(error);
        }
    };

    /**
     * APLICAR FILTROS
     */
    const handleApplyFilters = useCallback(() => {
        // ASIGNAR FILTROS
        onChangeFilter('estado', selectedStatu);
        // CERRAR FILTERS
        handleToggleFilter(false);
    }, [selectedStatu]);

    /**
     * RESET FILTROS
     */
    const handleClearFilters = () => {
        setSelectedStatu('');
        onChangeFilter('estado', '');
        // CERRAR FILTERS
        handleToggleFilter(false);
    }
    
    useEffect(() => {
        loadCategories();
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
                            id={'estado'}
                            title="Estados"
                            titleStyle={[
                                styles.listTitle,
                                expanded['estado'] ? styles.listTitleActive : null
                            ]}
                            rippleColor={'transparent'}
                        >
                            <View style={{marginHorizontal: 10}}>
                                {status && status.map(obj => (
                                    <CheckboxInput key={`status_${obj.estado}`} value={obj.estado} isChecked={selectedStatu == obj.estado} onChangeText={setSelectedStatu} style={styles.itemText}>
                                        {obj.estado} ({obj.cantidad})
                                    </CheckboxInput>
                                ))}
                                {/* CONTENEDEDOR - LOANDING */}
                                {loading && (
                                    <LoandingPage size={30} color={theme.colors.primary} text={'Cargando estados...'} textStyle={{color: theme.colors.custom_blue}} />
                                )}
                                {/**
                                 * NOTFOUNT
                                */}
                                {!loading && Object.keys(status).length == 0 && (
                                    <NotFound text={'No se encontraron estados'} />
                                )}
                            </View>
                        </List.Accordion>
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