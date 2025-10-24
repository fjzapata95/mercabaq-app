import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Provider } from 'react-native-paper';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { StackParams } from '@core/navigation';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { useForm } from '@hooks/useForm';
import { validateForm } from '@core/auth/formValidator';
import { showAlert } from '@core/root-store/actions/util.action';
import { AppBar } from '@components/AppBar';
import { InfoText } from '@components/utils/InfoText';
import { theme } from '@theme';
import uuid from 'react-uuid';
import apiHelpers from '@core/auth/apiHelpers';

import TextInput from '@components/form/TextInput';
import ButtonSubmit from '@components/form/ButtonSubmit';
import DateTimePicker from '@components/form/DateTimePicker';

interface Props extends NativeStackScreenProps<StackParams> {}

export const ProfileFormSreen = ({ navigation }: Props) => {

    const { user } = useSelector(({ auth }: ReduxState) => ({
        user: auth.user
    }), shallowEqual);
    
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();
    
    const { onChange, setFormdata, form } = useForm({
        id: '',
        documento: '',
        email: '',
        fechaNacimiento: '',
        name: '',
        telefono: '',
        tipoDocumento: ''
    });
    const [profileErrorText, setProfileErrorText] = useState<any>({
        documento: '',
        email: '',
        fechaNacimiento: '',
        name: '',
        telefono: '',
        tipoDocumento: ''
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    /**
     *
     */
    const onSubmit = async () => {
        try {
            // 
            const validator = await validateForm(form, {
                name: { required: true },
                email: { required: true }
            });
            // 
            if (validator.valid) {
                // LOANDING
                setIsSubmitting(true);
                // 
                const { data: { message } } = await apiHelpers.post<any>(`user/update`, form);
                // ALERT PARA EL USUARIO.
                dispatch(showAlert({ show: true, message: message }));
                // LOANDING
                setIsSubmitting(false);
            } else {
                setProfileErrorText(validator.newErrorText);
            }
        } catch (error: any) {
            // 
            console.log('UPDATE PROFILE ERROR: ', error.data)
            // VALIDAR SI SE OBTIENE LA RESPUESTA.
            if (error && error.data && error.data.message) {
                // MENSAGE DE LA PETICION
                dispatch(showAlert({show: true, message: error.data.message}));
            } else {
                // ALERTA PARA EL USUARIO - ERROR AL CREAR EL CLIENTE.
                dispatch(showAlert({ show: true, message: 'Lamentablemente, no hemos podido completar la actualización de tu perfil en este momento. Por favor, revisa los cambios que estás intentando realizar y asegúrate de que todos los campos requeridos estén llenos correctamente. Si el problema persiste, te sugerimos intentarlo nuevamente más tarde. Si necesitas ayuda adicional, no dudes en ponerte en contacto con nuestro equipo de soporte.'}));
            }
            // FINALIZAR LOANDING DEL BOTON DE SUBMIT.
            setIsSubmitting(false);
        }
    }

    /**
     * MÉTODO PARA OBTENER PRODUCTO.
     */
    const getUserById = useCallback(async () => {
        //
        try {
            // OBTENER PRODUCTO POR ID.
            const { data: { data, error } } = await apiHelpers.get<any>(`user/get/data`);
            // VALIDAR
            if (!error) {
                // ASIGNAR DATA
                setFormdata({
                    id: data.id,
                    documento: data.documento || '',
                    email: data.email,
                    fechaNacimiento: data.fechaNacimiento || '',
                    name: data.name,
                    telefono: data.telefono || '',
                    tipoDocumento: data.tipoDocumento || ''
                });
            }
        } catch (error) {
            //
            console.log('GET PRODUCT ID - ERROR: ', error, typeof error);
        }
    }, []);

    /**
     * 
     */
    useEffect(() => { getUserById() }, []);
    
    return (
        <Provider>
            <AppBar 
                title={'Perfil'}
                navigation={navigation}
                fromPage={'profile'}
            />
            <View style={styles.container}>
                <SafeAreaView style={styles.flexContainer}>
                    <KeyboardAvoidingView
                        style={styles.flexContainer}
                        behavior={Platform.select({
                            ios: 'padding',
                            android: 'height'
                        })}
                        enabled
                    >
                        <ScrollView
                            key={uuid()}
                            nestedScrollEnabled
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps="handled"
                            contentInsetAdjustmentBehavior="automatic"
                            contentContainerStyle={{ paddingBottom: 0 }}
                            style={styles.flexContainer}
                        >
                            <View style={styles.page}>
                                <InfoText text={'Información Básica'} />
                                <TextInput
                                    key={'nombre'}
                                    label={'Nombre'}
                                    value={form.name}
                                    onChangeText={(value: any) => onChange(value, 'name')}
                                />
                                <TextInput
                                    key={'email'}
                                    label={'Correo'}
                                    value={form.email}
                                    textContentType="emailAddress"
                                    keyboardType="email-address"
                                    onChangeText={(value: any) => onChange(value, 'email')}
                                />
                                <InfoText text={'Información Adicional'} />
                                <DateTimePicker
                                    label={'Fecha Nacimiento'}
                                    value={form.fechaNacimiento}
                                    type={'date'}
                                    format={'YYYY-MM-DD'}
                                    onChangeText={(value: any) => onChange(value, 'fechaNacimiento')}
                                />
                                <TextInput
                                    key={'phone'}
                                    label={'Teéfono'}
                                    value={form.telefono}
                                    textContentType="telephoneNumber"
                                    keyboardType="numeric"
                                    onChangeText={(value: any) => onChange(value, 'telefono')}
                                />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
                <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
                    { /* BUTTON SUBMIT */}
                    <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onSubmit}>{'Guardar Cambios'}</ButtonSubmit>
                </View>
            </View>
        </Provider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    flexContainer: {
        flex: 1
    },
    page: {
        marginHorizontal: 12,
    },
});