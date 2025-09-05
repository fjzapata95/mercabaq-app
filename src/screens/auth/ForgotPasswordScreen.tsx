import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { validateForm } from '@core/auth/formValidator';
import { useForm } from '@hooks/useForm';
import { theme } from '@theme';

import ButtonSubmit from '@components/form/ButtonSubmit';
import TextInput from '@components/form/TextInput';

// REDUX
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { passwordForget } from '@core/root-store/actions/auth.action';
import { Fonts } from '@core/constants/fontsContans';

type Props = {
    navigation: any;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {

    const { isSubmitting } = useSelector(({ auth }: ReduxState) => ({
        isSubmitting: auth.loanding
    }), shallowEqual);

    const dispatch = useDispatch();

    const { email, onChange, form } = useForm({
        email: ''
    });
    // 
    const [errorText, setErrorText] = useState({
        email: ''
    });

    const _onSendPressed = async () => {
        const validator = await validateForm(form, {
            email: { required: true, email: true }
        });
        // 
        if (validator.valid) {
            dispatch(passwordForget({ email }));
        } else {
            setErrorText(validator.newErrorText);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.containerHeader}>
                <View style={styles.containerHeaderText}>
                    <Text style={styles.headerTitle}>{'¿Olvidaste tu contraseña?'}</Text>
                    <Text style={styles.headerDesc}>{'Si olvidaste tu contraseña, ingresa tu dirección de correo electrónico y recibirás un mensaje con las instrucciones para restablecerla.'}</Text>
                </View>
                <TextInput
                    label={'Correo electrónico'}
                    placeholder={'correo@ejemplo.com'}
                    returnKeyType="done"
                    value={email}
                    onChangeText={value => onChange(value, 'email')}
                    errorText={errorText.email}
                    error={!!errorText.email}
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                {/* BUTTON SUBMIT */}
                <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={_onSendPressed}>Restaurar Contraseña</ButtonSubmit>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => navigation.navigate('login')}
                >
                    <Text style={styles.label}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 360,
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    /** ---- HEADER ---- */
    containerHeader: {
        backgroundColor: theme.colors.background,
        padding: 20,
        borderRadius: 10,
        marginTop: 50,
    },
    containerHeaderText: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 25,
        fontFamily: Fonts.DMSansBold,
        paddingVertical: 6,
        color: theme.colors.custom_green_dark,
        alignSelf: 'center'
    },
    headerDesc: {
        fontSize: 18,
        fontFamily: Fonts.DMSansSemiBold,
        color: theme.colors.custom_grey,
        textAlign: 'center'
    },
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.custom_green_dark,
        fontFamily: Fonts.DMSansSemiBold,
        fontSize: 16,
        alignSelf: 'flex-end'
    },
});

export default memo(ForgotPasswordScreen);
