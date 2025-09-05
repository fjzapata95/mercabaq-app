import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '@theme';
import axios from 'axios';
import apiHelpers from '@core/auth/apiHelpers';
//
import { SimpleRequest } from '@core/interfaces/simple.interface';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
//
import { Divider, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    label: string,
    value: any,
    dataUrl: string;
    remote: boolean;
    onChangeText: (value: any) => void;
    multiple?: boolean;
    staticData?: Array<ItemType<string>>;
    additionalParams?: any
    errorText?: string;
    returnObj?: boolean; // DEFAULT False - SI ESTA EN True RETORNAR EL OBJETO COMPLETO DE LA OPCION SELECCIONADA.
    objId?: string;
    objLabel?: string;
}

const ComboBox = ({ label, value, remote, multiple = false, dataUrl, staticData, additionalParams, errorText, returnObj, onChangeText, objId = 'id', objLabel = 'text' }: Props) => {

    const [items, setItems] = useState<Array<ItemType<string>>>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoanding, setIsLoanding] = useState<boolean>(false);
    const [newValue, setNewValue] = useState<any>(value);
    const [searchText, setSearchText] = useState<string>('');

    const comboReqRef: any = useRef<any>(null);
    const additionalParamsRef = useRef<any>(additionalParams);
    /**
     * 
     */
    const getDropdownItems = useCallback(async () => {
        try {
            // VALIDAR SI SE ESTA CARGANDO POR PRIMERA VEZ.
            setIsLoanding(true);
            // VALIDATE TIPO
            if (remote && dataUrl) {
                //
                comboReqRef && comboReqRef.current && comboReqRef.current();
                // 
                const { CancelToken } = axios;
                // PARAMETROS.
                let params: any = {
                    searchText: searchText
                }
                // VALIDAR SI HAY VALOR POR DEFECTO.
                if (value) {
                    // ADICIONAR VALUE
                    params = Object.assign(params, { selectedValue: Array.isArray(value) ? value.map(u => u.id || u).join() : value });
                }
                // VALIDAR SI HAY PARAMETROS ADICIONALES
                if (additionalParamsRef) { params = Object.assign(params, additionalParamsRef.current); }
                // OBTENER LISTADO.
                const { data: { data } } = await apiHelpers.get<SimpleRequest>(dataUrl, {
                    params: { ...params },
                    cancelToken: new CancelToken(((c) => {
                        comboReqRef.current = c;
                    }))
                });
                // ASIGNAR DATOS
                setItems(data.map((item: any) => ({
                    value: item[objId],
                    label: item[objLabel],
                })) as any);
            } else {
                if (staticData) {
                    // ASIGNAR DATOS.
                    setItems(staticData);
                }
            }
            // VALIDAR SI SE ESTA CARGANDO POR PRIMERA VEZ.
            setIsLoanding(false);
        } catch (error) {
            console.log('ComboBox - ERROR: ', error);
        }
    }, [remote, dataUrl, staticData, additionalParams, searchText]);
    /**
     * LIMPLIAR SELECTOR.
     */
    const resetDropDownPicker = () => {
        // VALIDAR SI ES MULTIPLE
        if (multiple) {
            // RESET VALUE ARRAY.
            setNewValue([]);
        } else {
            // RESET VALUE
            setNewValue('');
        }
        //
        setSearchText('');
    }
    /**
     * 
     */
    useEffect(() => {
        getDropdownItems();
    }, [dataUrl, searchText, staticData]);
    /**
     * 
     */
    useEffect(() => {
        // VALIDAR CUANDO SE CIERRA EL MODAL.
        if (!open) {
            // RESET VALUE SEARCH.
            setSearchText('');
        }
    }, [open]);
    /**
     * 
     */
    useEffect(() => {
        // ASIGNAR VALOR INICIAL.
        setNewValue(value);
    }, [value, newValue]);
    /**
     * 
     */
    useEffect(() => {
        getDropdownItems();
    }, []);

    return (
        <View>
            <DropDownPicker
                mode={'BADGE'}
                listMode={'MODAL'}
                open={open}
                value={newValue}
                items={items}
                loading={isLoanding}
                placeholder={label}
                searchPlaceholder={'Buscar...'}
                language={'ES'}
                searchable={true}
                setOpen={setOpen}
                setValue={setNewValue}
                multiple={multiple}
                disableLocalSearch={remote}
                onChangeSearchText={setSearchText}
                onSelectItem={(item: any) => {
                    // VALIDAR SI SE RETORNA EL OBJETO COMPLETO.
                    if (returnObj) {
                        // ASIGNAR DATO
                        onChangeText(item || '')
                    } else {
                        // ASIGNAR DATO
                        onChangeText(item?.value || '')
                    }
                }}
                modalProps={{
                    transparent: true,
                    presentationStyle: 'overFullScreen'
                }}
                modalContentContainerStyle={{
                    backgroundColor: theme.colors.surface,
                    marginTop: 200,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    height: 400,
                    flexGrow: undefined
                }}
                CloseIconComponent={(props) => <Icon {...props} name={'close'} size={26} color={theme.colors.backdrop} />}
                flatListProps={{
                    ItemSeparatorComponent: () => <Divider />,
                    style: {
                        paddingHorizontal: 20
                    }
                }}
                containerStyle={{
                    marginVertical: 8
                }}
                style={{
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: theme.colors.backdrop,
                    paddingLeft: 16
                }}
                labelStyle={{
                    fontSize: 16,
                    color: theme.colors.text
                }}
                placeholderStyle={{
                    fontSize: 16,
                    color: theme.colors.backdrop
                }}
                searchContainerStyle={{
                    marginTop: 10,
                    paddingHorizontal: 20,
                    borderBottomColor: 'transparent'
                }}
                searchTextInputStyle={{
                    height: 40,
                    fontWeight: '600',
                    color: theme.colors.text
                }}
                listItemContainerStyle={{
                    height: 46
                }}
                listItemLabelStyle={{
                    fontSize: 16,
                    color: theme.colors.text
                }}
                itemSeparatorStyle={{
                    backgroundColor: theme.colors.backdrop
                }}
            />
            {(Array.isArray(newValue) ? Object.keys(newValue).length > 0 : !!newValue) && (
                <View style={{ position: 'absolute', right: 34, top: 23, zIndex: 9999 }}>
                    <Icon onPress={resetDropDownPicker} name={'close-circle-outline'} size={20} color={theme.colors.backdrop} />
                </View>
            )}
            {/**
             * OPACIDAD DE FONDO PARA CUANDO SE ABRE EL MODAL.
             */}
            {open && (
                <Portal>
                    <View style={styles.overlayContent} />
                </Portal>
            )}
            {/**
             * MENSAJE DE ERROR.
             */}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
};

const styles = StyleSheet.create({
    overlayContent: {
        flex: 1,
        backgroundColor: theme.colors.backdrop
    },
    error: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
});

export default memo(ComboBox);
