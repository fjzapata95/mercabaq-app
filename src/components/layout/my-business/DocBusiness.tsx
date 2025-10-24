import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';

import ButtonSubmit from '@components/form/ButtonSubmit';
import { validateForm } from '@core/auth/formValidator';
import { showAlert } from '@core/root-store/actions/util.action';

import DocumentPicker from 'react-native-document-picker';
import ButtonCustom from '@components/form/ButtonCustom';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { setBusinessData } from '@core/root-store/actions/auth.action';
import axios from 'axios';
import { MERCABAQ_TOKEN_SESSION } from '@core/constants/authConstans';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    business: any
}

export const DocBusiness = ({ business }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const { user } = useSelector(({ auth }: ReduxState) => ({
        user: auth.user
    }), shallowEqual);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [form, onChange] = useState<any>({
        fileRut: {},
        fileCamaraComercio: {},
        fileCedula: {}
    });

    /**
     *
     */
    const onCreateDoc = useCallback(async () => {
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
                formData.append('id', business.id);
                formData.append('fileRut', { uri: form.fileRut.uri, name: form.fileRut.name, type: form.fileRut.type });
                formData.append('fileCamaraComercio', { uri: form.fileCamaraComercio.uri, name: form.fileCamaraComercio.name, type: form.fileCamaraComercio.type });
                formData.append('fileCedula', { uri: form.fileCedula.uri, name: form.fileCedula.name, type: form.fileCedula.type });
                
                const options = {
                    method: 'POST',
                    url: 'https://jointerp.com:12098/api/v1/negocio/adjunto',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${MERCABAQ_TOKEN_API}`
                    },
                    data: formData
                };

                console.log(formData)
                
                const { data: { data, error, message } } = await axios.request(options);

                console.log({ data, error, message })
                // VALIDAR 
                if ( error ) {
                    // MENSAJE PARA EL CLIENTE
                    dispatch(showAlert({show: true, message: message}))
                } else {
                    // ADICIONAR DATA.
                   dispatch(setBusinessData(business));
                }
                setIsSubmitting(false);
            } catch (error) {
                dispatch(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar la creación de su negocio en este momento. Por favor, verifica tus datos e intenta nuevamente.'}));
                setIsSubmitting(false);
                console.error(error);
            }
        }
    }, [form, user, business]);
    
    const onSelectFile = (field: any) => {

        DocumentPicker.pick({
            allowMultiSelection: false,
            type: [DocumentPicker.types.doc, DocumentPicker.types.pdf],
        })
            .then(([ data ]) => {
                onChange((prev: any) => ({
                    ...prev,
                    [field]: data
                }));
            })
            .catch((data) => {
                console.log(data)
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Documentos legales</Text>
            <View style={styles.optionsContainer}>
                <View>
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
                        onPress={() => onSelectFile('fileRut')}
                        icon={'attachment'}
                    >
                        {form.fileRut && form.fileRut.name ? form.fileRut.name : 'Adjuntar Rut'} 
                    </ButtonCustom>
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
                        onPress={() => onSelectFile('fileCamaraComercio')}
                        icon={'attachment'}
                    >
                        {form.fileCamaraComercio && form.fileCamaraComercio.name ? form.fileCamaraComercio.name : 'Adjuntar Camara Comercio'} 
                    </ButtonCustom>
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
                        onPress={() => onSelectFile('fileCedula')}
                        icon={'attachment'}
                    >
                        {form.fileCedula && form.fileCedula.name ? form.fileCedula.name : 'Adjuntar Cedúla'} 
                    </ButtonCustom>
                    {/** BUTTONS */}
                    <View style={{paddingHorizontal: 8, marginBottom: 10, alignSelf: 'center'}}>
                        {/* BUTTON SUBMIT */}
                        <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onCreateDoc}>{'Enviar documentos'}</ButtonSubmit>
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
    }
});