import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { List, Provider, Text } from 'react-native-paper';
import { StackParams } from '@core/navigation';
import apiHelpers from '@core/auth/apiHelpers';
import { AppBar } from '@components/AppBar';
import { theme } from '@theme';

//
import ButtonCustom from '@components/form/ButtonCustom';
import { NotFound } from '@components/NotFound';
import { LoandingPage } from '@components/LoandingPage';

import { Address, AddressesRequest, AddressesResponse } from '@core/interfaces/address.interfaces';
import CheckboxInput from '@components/form/CheckboxInput';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { showAlert } from '@core/root-store/actions/util.action';

interface Props extends NativeStackScreenProps<StackParams> {}

export const AddressesScreen = ({ navigation }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [mainaddress, setMainAddress] = useState<any>(0);

    /**
     * OBTENER LISTADO DE DIRECCIONES
     */
    const loadAddresses = async () => {
        // LOANDING
        if (!isFetching) setLoading(true);
        try {
            // 
            const { data: { data, error } } = await apiHelpers.get<AddressesResponse>(`dir/get`);
            // VALIDAR SI SE OBTUVO DATOS
            if (!error) {
                // ASIGNAR DATOS
                setAddresses(data);
            } else {
                // ASIGNAR DATOS
                setAddresses([]);
            }
            setLoading(false);
            setIsFetching(false);
        } catch (error) {
            setAddresses([]);
            setLoading(false);
            setIsFetching(false);
        }
    }

    /**
     * 
     */
    const onRefresh = () => {
        setIsFetching(true);
        // ASIGNAR NUEVA PAGINA AL FILTRO.
        loadAddresses();
    };

    /**
     * ELIMINAR DIRECCION
     */
    const deletePress = async (id: any) => {
        try {
            /**
             * ELIMINAR DIRECCION.
             */
            const { data: { message, error } }: any = await apiHelpers.delete(`dir/delete/${id}`);
            // VALIDAR
            if (!error) {
                // REFRESH DATA
                loadAddresses();
            }
            // MENSAJE PARA EL CLIENTE
            dispatch(showAlert({show: true, message: message}));

        } catch (error: any) {
            //
            console.log('ELIMINAR DIRECCION - ERROR: ', error);
            // VALIDAR SI SE OBTIENE LA RESPUESTA.
            if (error && error.data && error.data.message) {
                // MENSAGE DE LA PETICION
                dispatch(showAlert({show: true, message: error.data.message}));
            } else {
                // MENSAJE POR DEFECTO
                dispatch(showAlert({ show: true, message: 'Lamentablemente, no se pudo eliminar la dirección en este momento. Por favor, verifica la conexión a internet y asegúrate de que estás siguiendo los pasos correctos para eliminar la dirección. Si el problema persiste, te recomendamos intentarlo nuevamente más tarde. Si necesitas ayuda adicional, no dudes en ponerte en contacto con nuestro equipo de soporte.' }));
            }
        }
    };

    /**
     * MARCAR DIRECCION COMO PRINCIPAL
     */
    const mainPress = async (id: any) => {
        try {
            /**
             * ELIMINAR DIRECCION.
             */
            const { data: { message, error } }: any = await apiHelpers.post<AddressesRequest>('dir/update', {
                id,
	            isPrincipal: true
            });
            // VALIDAR
            if (!error) {
                // ASIGNAR DATA
                setMainAddress(id);
            }
            // MENSAJE PARA EL CLIENTE
            dispatch(showAlert({show: true, message: message}));

        } catch (error: any) {
            //
            console.log('MODIFICAR DIRECCION - ERROR: ', error);
            // VALIDAR SI SE OBTIENE LA RESPUESTA.
            if (error && error.data && error.data.message) {
                // MENSAGE DE LA PETICION
                dispatch(showAlert({show: true, message: error.data.message}));
            } else {
                // MENSAJE POR DEFECTO
                dispatch(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar la creación de la dirección en este momento. Por favor, verifica tus datos e intenta nuevamente.'}));
            }
        }
    };
        
    /**
     * RENDER ORDER
     * @param param0 
     * @returns 
     */
    const renderItem = ({ item }: { item: Address }) => (
        <View style={styles.addressesContainer}>
            <List.Item
                title={item.complemento}
                description={`${item.ciudad}, ${item.departamento}`}
                left={props =>  <CheckboxInput {...props} key={`address_${item.id}`} isChecked={(item.id == mainaddress)} value={item.id} onChangeText={mainPress} children={undefined}></CheckboxInput>}
                right={props =>
                    <View {...props}
                        style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('updateaddress', {id: item.id})}
                        >
                            <Icon {...props} name={'edit'} color={theme.colors.backdrop} size={20} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => deletePress(item.id)}
                        >
                            <Icon size={24} color={theme.colors.backdrop} name={'trash'} />
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
    
    /**
     * 
     */
    useEffect(() => {
        loadAddresses();
    }, []);

    return (
        <Provider>
            <AppBar 
                title={'Mis Direcciones'}
                navigation={navigation}
                fromPage={'home'}
            />
            <View style={styles.container}>
                <View style={{marginHorizontal: 10}}>
                    <ButtonCustom
                        mode={'outlined'}
                        buttonColor={theme.colors.custom_blue}
                        textColor={theme.colors.surface}
                        onPress={() => navigation.navigate('createaddress')}
                    >
                        Agregar Dirección
                    </ButtonCustom>
                </View>

                <View style={[styles.container, {marginTop: 10, marginHorizontal: 8}]}>
                    <FlatList
                        data={addresses}
                        keyExtractor={(item, index) => `addresses_account_${item.id}-${index}`}
                        renderItem={renderItem}
                        style={{
                            backgroundColor: theme.colors.background
                        }}
                        showsVerticalScrollIndicator={false}
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                        ListEmptyComponent={() => <NotFound text={'No se encontraron direcciones'} />}
                    />
                    {/* CONTENEDEDOR - LOANDING */}
                    {loading && (
                        <LoandingPage
                            size={100}
                            color={theme.colors.primary}
                            background={theme.colors.background}
                        />
                    )}
                </View>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    addressesContainer: {
        flex: 1
    },
    button: {
        padding: 6,
        borderRadius: 50
    },
});
