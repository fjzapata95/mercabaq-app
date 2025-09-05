import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Appbar, Badge } from 'react-native-paper';
import { theme } from '@core/theme';

import SearchInput from '@components/form/SearchInput';
import { LogoAlcaldia } from '@components/svg/LogoAlcaldia';
import { Fonts } from '@core/constants/fontsContans';

// REDUX
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { handleFilter } from '@core/root-store/actions/filter.action';

export const MainHeader = ({ navigation, route }: any) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const { cartProd, filterCat } = useSelector(({ cart, filter }: ReduxState) => ({
        cartProd: cart.items,
        filterCat: filter
    }), shallowEqual);
    
    const [searchQuery, setSearchQuery] = useState<string>('');

    /**
     * 
     */
    const goSearch = useCallback(async () => {
        // VALIDAR SI TIENE DATOS
        if (!!searchQuery) {
            //
            dispatch(handleFilter({ search: searchQuery }))
            // Si ya estamos en la vista de catálogo, ejecuta la búsqueda
            if (route.name !== 'catalog') {
                // Redirigir a la vista de catálogo con el término de búsqueda
                navigation.navigate('catalog');
            }
        }
    }, [route.name, searchQuery]);
    
    /**
     * 
     */
    useEffect(() => {
        if (filterCat && filterCat.search) {
            setSearchQuery(filterCat.search);
        } else {
            setSearchQuery('');
        }
    }, [filterCat]);
  
    return (
        <View style={styles.constainer}>
            <Appbar.Header style={styles.header}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: '60%'}}>
                        <LogoAlcaldia width="100%" height="100%" fill={theme.colors.surface} />
                    </View>
                    <View style={{alignItems: 'flex-end', flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('shoppingcart')}
                            style={{
                                backgroundColor: '#06111D',
                                borderRadius: 50,
                                width: 46,
                                height: 46,
                                padding: 8,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Badge style={{position: 'absolute', backgroundColor: theme.colors.custom_green, top: -6, fontFamily: Fonts.ManropeBold, fontSize: 10}}>{Object.keys(cartProd).length}</Badge>
                            <IconFeather name={'shopping-cart'} size={23} color={theme.colors.surface}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Appbar.Header>

            <View style={{
                borderTopWidth: 2,
                borderColor: '#0D1B2A',
                paddingHorizontal: 14,
                paddingTop: 10,

                shadowColor: '#0D1B2A',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}>
                <SearchInput
                    placeholder="Buscar"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    onIconPress={goSearch}
                    onClearPress={() => dispatch(handleFilter({ search: null }))}
                />
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    constainer: {
        backgroundColor: theme.colors.custom_blue,
        paddingBottom: 10
    },
    header: {
        marginTop: 4,
        paddingHorizontal: 14,
        backgroundColor: theme.colors.custom_blue
    }
});