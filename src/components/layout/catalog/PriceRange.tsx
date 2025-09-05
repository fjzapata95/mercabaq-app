import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, IconButton, Modal, Portal, Text } from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Filters } from '@core/interfaces/catalog.interfaces';
import { Fonts } from '@core/constants/fontsContans';
import { theme } from '@core/theme';

import TextInput from '@components/form/TextInput';
import ButtonCustom from '@components/form/ButtonCustom';

interface Props {
    filters: Filters;
    visible: boolean;
    handleTogglePriceRange: (value: boolean) => void;
    onChangeFilter: (field: string, value: any) => void
}

export const PriceRangeCatalog = ({ visible, filters, handleTogglePriceRange, onChangeFilter}: Props) => {

    const [sliderValues, setSliderValues] = useState([filters.precioMin, filters.precioMax]);
    const [minValue, setMinValue] = useState(`${filters.precioMin}`);
    const [maxValue, setMaxValue] = useState(`${filters.precioMax}`);
    
    const handleSliderChange = (values: number[]) => {
        setSliderValues(values);
        setMinValue(values[0].toString());
        setMaxValue(values[1].toString());
    };

    const handleInputChange = (type: 'min' | 'max', value: string) => {
        const numericValue = parseInt(value, 10) || 0;
        if (type === 'min') {
          const updatedValues = [Math.min(numericValue, sliderValues[1]), sliderValues[1]];
          setSliderValues(updatedValues);
          setMinValue(updatedValues[0].toString());
        } else {
          const updatedValues = [sliderValues[0], Math.max(numericValue, sliderValues[0])];
          setSliderValues(updatedValues);
          setMaxValue(updatedValues[1].toString());
        }
    };
    
    /**
     * APLICAR FILTRO DE RANGO DE PRECIO
     */
    const handleApplyFilters = useCallback(() => {
        // ASIGNAR FILTROS
        onChangeFilter('precioMin', minValue);
        onChangeFilter('precioMax', maxValue);
        // CERRAR FILTERS
        handleTogglePriceRange(false);
    }, [minValue, maxValue]);

    /**
     * RESER FILTROS
     */
    const handleClearFilters = () => {
        handleSliderChange([0, 1000000]);
        onChangeFilter('precioMin', 0);
        onChangeFilter('precioMax', 1000000);
        // CERRAR FILTERS
        handleTogglePriceRange(false);
    }
  
    return (
        <Portal theme={theme}>
            <Modal visible={visible} onDismiss={() => handleTogglePriceRange(false)} contentContainerStyle={styles.modal}>
                <View>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Precio:</Text>
                        <IconButton icon="close" onPress={() => handleTogglePriceRange(false)} />
                    </View>

                    <Divider style={styles.divider} />

                    <View style={styles.body}>
                        <View style={styles.inputsContainer}>
                            <TextInput
                                label="Min"
                                value={minValue}
                                keyboardType="numeric"
                                onChangeText={(value) => handleInputChange('min', value)}
                                contentStyle={styles.inputContent}
                            />
                            <Text style={styles.dash}>—</Text>
                            <TextInput
                                label="Max"
                                value={maxValue}
                                keyboardType="numeric"
                                onChangeText={(value) => handleInputChange('max', value)}
                                contentStyle={styles.inputContent}
                            />
                        </View>
                        <MultiSlider
                            values={sliderValues}
                            sliderLength={346}
                            onValuesChange={handleSliderChange}
                            min={0}
                            max={5000000}
                            step={1}
                            allowOverlap
                            snapped
                            selectedStyle={styles.selectedTrack}
                            unselectedStyle={styles.unselectedTrack}
                            markerStyle={styles.marker}
                            containerStyle={styles.sliderContainer}
                            trackStyle={{
                                height: 10
                            }}
                        />
                    </View>
                    
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
    inputsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    body: {
        marginHorizontal: 12
    },
    dash: {
        fontSize: 24,
        marginHorizontal: 14,
        color: theme.colors.custom_blue
    },
    divider: {
        marginVertical: 8
    },
    sliderContainer: {
        marginHorizontal: 12,
        marginTop: 10,
        width: 'auto'
    },
    selectedTrack: {
        backgroundColor: theme.colors.custom_green_dark,
    },
    unselectedTrack: {
        backgroundColor: theme.colors.custom_grey
    },
    marker: {
        backgroundColor: theme.colors.surface,
        borderWidth: 2,
        borderColor: theme.colors.custom_green_dark,
        height: 26,
        width: 26,
        marginTop: 8
    },
    inputContent: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: Fonts.ManropeMedium,
        width: 160
    }
});