import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
//
import { theme } from '@theme';
import { StackParams } from '@core/navigation';
import { useForm } from '@hooks/useForm';
import { validateForm } from '@core/auth/formValidator';
import { useDispatch } from 'react-redux';
import { showAlert } from '@core/root-store/actions/util.action';
import { AppBar } from '@components/AppBar';

import ButtonSubmit from '@components/form/ButtonSubmit';
import apiHelpers from '@core/auth/apiHelpers';

interface Props extends NativeStackScreenProps<StackParams> {}

export const CreatePqrScreen = (props: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { onChange, setFormdata, form } = useForm({
        ciudad: '',
        departamento: ''
    });
    const [errorText, setErrorText] = useState({
        ciudad: '',
        departamento: ''
    });

    /**
     *
     */
    const onCreate = useCallback(async () => {
        // VALIDAR FORMULARIO
        const validator = await validateForm(form, {
            ciudad: { required: true },
            departamento: { required: true }
        });
        //
        if (validator.valid) {
            // LOANDING
            setIsSubmitting(true);
            try {
                const { data: { error, message } } = await apiHelpers.post<any>('pqr/create', form);
                // MENSAJE PARA EL CLIENTE
                dispatch(showAlert({show: true, message: message}));
                // LOANDING
                setIsSubmitting(false);
                // VALIDAR 
                if ( !error ) {
                    // RESET DATA
                    reset();
                    // RETORNAR A LA VISTA
                    props.navigation.navigate('pqr');
                }
            } catch (error: any) {
                // VALIDAR SI SE OBTIENE LA RESPUESTA.
                if (error && error.data && error.data.message) {
                    // MENSAGE DE LA PETICION
                    dispatch(showAlert({show: true, message: error.data.message}));
                } else {
                    // MENSAJE POR DEFECTO
                    dispatch(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar la creación del PQR en este momento. Por favor, verifica tus datos e intenta nuevamente.'}));
                }
                setIsSubmitting(false);
                console.error(error);
            }
        } else {
            setErrorText(validator.newErrorText);
        }
    }, [form]);

    /**
     * 
     */
    const reset = () => {
        setFormdata({
            ciudad: '',
            departamento: ''
        });
    }

    return (
        <View style={styles.container}>
            <AppBar 
                title={'Agregar PQR'}
                navigation={props.navigation}
                fromPage={'pqr'}
            />
            <SafeAreaView style={styles.container}>
                <ScrollView
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                >
                    <View style={styles.body}>
                        {/** FORMULARIO */}

                        {/** BUTTONS */}
                        <View style={{paddingHorizontal: 8, marginBottom: 10, alignSelf: 'center'}}>
                            {/* BUTTON SUBMIT */}
                            <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onCreate}>{'Crear PQR'}</ButtonSubmit>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    body: {
        marginHorizontal: 8,
        marginVertical: 8
    }
});
