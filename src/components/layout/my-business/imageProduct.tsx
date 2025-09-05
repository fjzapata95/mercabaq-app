import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import apiHelpers from '@core/auth/apiHelpers';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';

import ButtonSubmit from '@components/form/ButtonSubmit';
import { validateForm } from '@core/auth/formValidator';
import { showAlert } from '@core/root-store/actions/util.action';

import DocumentPicker from 'react-native-document-picker';
import ButtonCustom from '@components/form/ButtonCustom';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MERCABAQ_TOKEN_SESSION } from '@core/constants/authConstans';

interface Props {
    product: any;
    handlePress: (expandedId: string | number) => void;
    update?: boolean;
}

export const ImageProduct = ({ product, handlePress, update = false }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const { user } = useSelector(({ auth }: ReduxState) => ({
        user: auth.user
    }), shallowEqual);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [form, onChange] = useState<any[]>([]);

    /**
     *
     */
    const onCreateImage = useCallback(async () => {
        // VALIDAR FORMULARIO
        const validator = await validateForm(form, {
            fileRut: { required: true },
            fileCamaraComercio: { required: true },
            fileCedula: { required: true }
        });
        //
        if (validator.valid) {
            // LOANDING
            setIsSubmitting(true);
            try {
                // OBTENER TOKEN - VALOR POR DEFECTO NULL
                const MERCABAQ_TOKEN_API = await AsyncStorage.getItem(MERCABAQ_TOKEN_SESSION);
                // FORMDATA
                const formData = new FormData();
                // Agregar ID al formulario
                formData.append('productCode', product.id);
                // Agregar imágenes al formulario
                form.forEach((image) => {
                    formData.append(`images`, {
                        uri: image.uri, // URI de la imagen
                        name: image.name, // Nombre del archivo
                        type: image.type, // Tipo de contenido (MIME)
                    });
                });
                
                const options = {
                    method: 'POST',
                    url: 'https://jointerp.com:12098/api/v1/proimg/save',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${MERCABAQ_TOKEN_API}`
                    },
                    data: formData
                };
                
                const { data: { data, error, message } } = await axios.request(options);
                // MENSAJE PARA EL CLIENTE
                dispatch(showAlert({show: true, message: message}))
                // VALIDAR 
                if ( !error ) {
                    // ADICIONAR DATA.
                    handlePress('mainimage');
                }
                setIsSubmitting(false);
            } catch (error: any) {
                if (error && error.response && error.response.data && error.response.data.message) {
                    // MENSAGE DE LA PETICION
                    dispatch(showAlert({show: true, message: error.response.data.message}));
                } else {
                    // MENSAJE POR DEFECTO
                    dispatch(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar la creación de imagenes en este momento. Por favor, verifica tus datos e intenta nuevamente.'}));
                }
                setIsSubmitting(false);
                console.error(error.response);
            }
        }
    }, [form, product]);
    
    const onSelectFile = (field: any) => {
        DocumentPicker.pick({
            allowMultiSelection: false,
            type: [DocumentPicker.types.images, DocumentPicker.types.doc],
        })
            .then(([ data ]) => {
                //
                onChange((images: any) => [data, ...images]);
            })
            .catch((data) => {
                console.log(data)
            });
    }
        
    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.imageContainer}>
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Imagen del producto</Text>
            <View style={styles.optionsContainer}>
                <View>
                    <FlatList
                        data={form}
                        keyExtractor={(item, index) => `product_admin-${index}`}
                        renderItem={renderItem}
                        numColumns={2}
                        style={{
                            backgroundColor: theme.colors.background
                        }}
                        columnWrapperStyle={styles.columnWrapper}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    />
                    <ButtonCustom
                        mode={'outlined'}
                        style={{
                            borderRadius: 30,
                            borderColor: theme.colors.custom_green_dark,
                            marginVertical: 4
                        }}
                        contentStyle={{
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: theme.colors.custom_green_dark
                        }}
                        labelStyle={{
                            fontSize: 16,
                            fontFamily: Fonts.ManropeMedium
                        }}
                        textColor={theme.colors.custom_grey}
                        onPress={() => onSelectFile('images')}
                        icon={'attachment'}
                    >
                        {'Adjuntar Imagen'} 
                    </ButtonCustom>
                    {/** BUTTONS */}
                    <View style={{paddingHorizontal: 8, marginBottom: 10, alignSelf: 'center'}}>
                        {/* BUTTON SUBMIT */}
                        <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onCreateImage}>{'Guardar Cambios'}</ButtonSubmit>

                        {update && (
                            <ButtonCustom
                                compact
                                mode={'contained'}
                                style={{
                                    width: 170
                                }}
                                textColor={theme.colors.surface}
                                buttonColor={theme.colors.custom_green_dark}
                                onPress={() => handlePress('mainimage')}
                            >
                                Continuar
                            </ButtonCustom>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.DMSansMedium,
        color: theme.colors.custom_grey,
        marginBottom: 16,
    },
    optionsContainer: {
        flex: 1
    },
    imageContainer: {
        flex: 1
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 12
    }
});