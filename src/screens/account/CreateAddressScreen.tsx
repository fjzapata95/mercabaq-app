import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import uuid from 'react-uuid';
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
import { AddressesRequest } from '@core/interfaces/address.interfaces';
import { FormAddress } from '@components/layout/addresses/FormAddress';

interface Props extends NativeStackScreenProps<StackParams> {}

export const CreateAddressScreen = (props: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { onChange, setFormdata, form } = useForm({
        ciudad: '',
        departamento: '',
        // VALORES EXTRAS
        address: '',
        addressNumber: '',
        firstNumber: '',
        secondNumber: '',
        complement: ''
    });
    const [errorText, setErrorText] = useState({
        ciudad: '',
        departamento: '',
        // VALORES EXTRAS
        address: '',
        addressNumber: '',
        firstNumber: '',
        secondNumber: '',
        complement: ''
    });

    /**
     *
     */
    const onCreate = useCallback(async () => {
        // VALIDAR FORMULARIO
        const validator = await validateForm(form, {
            ciudad: { required: true },
            departamento: { required: true },
            address: { required: true },
            addressNumber: { required: true },
            firstNumber: { required: true },
            secondNumber: { required: true },
            complement: { required: true },
        });
        //
        if (validator.valid) {
            // PARAMETROS DE LA DIRECCION.
            const params = {
                ciudad: form.ciudad,
                departamento: form.departamento,
                complemento: `${form.address} ${form.addressNumber} # ${form.firstNumber} - ${form.secondNumber} ${form.complement}`,
                pais: 'CO',
                codigoPostal: '',
                isPrincipal: false,
                estado: true
            }
            // LOANDING
            setIsSubmitting(true);
            try {
                const { data: { error, message } } = await apiHelpers.post<AddressesRequest>('dir/create', params);
                // MENSAJE PARA EL CLIENTE
                dispatch(showAlert({show: true, message: message}));
                // LOANDING
                setIsSubmitting(false);
                // VALIDAR 
                if ( !error ) {
                    // RESET DATA
                    reset();
                    // RETORNAR A LA VISTA
                    props.navigation.navigate('addresses');
                }
            } catch (error: any) {
                // VALIDAR SI SE OBTIENE LA RESPUESTA.
                if (error && error.data && error.data.message) {
                    // MENSAGE DE LA PETICION
                    dispatch(showAlert({show: true, message: error.data.message}));
                } else {
                    // MENSAJE POR DEFECTO
                    dispatch(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar la creación de la dirección en este momento. Por favor, verifica tus datos e intenta nuevamente.'}));
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
            departamento: '',
            address: '',
            addressNumber: '',
            firstNumber: '',
            secondNumber: '',
            complement: ''
        });
    }

    return (
        <View style={styles.container}>
            <AppBar 
                title={'Agregar Dirección'}
                navigation={props.navigation}
                fromPage={'addresses'}
            />
            <SafeAreaView style={styles.container}>
                <ScrollView
                    key={uuid()}
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                >
                    <View style={styles.body}>
                        {/** FORMULARIO */}
                        <FormAddress form={form} errorText={errorText} onChange={onChange} />
                        {/** BUTTONS */}
                        <View style={{paddingHorizontal: 8, marginBottom: 10, alignSelf: 'center'}}>
                            {/* BUTTON SUBMIT */}
                            <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onCreate}>{'Guardar Dirección'}</ButtonSubmit>
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
