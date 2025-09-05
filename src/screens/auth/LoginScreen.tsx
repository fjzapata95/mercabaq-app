import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, TextInput as Input } from 'react-native-paper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
//
import { useForm } from '@hooks/useForm';
import { theme } from '@theme';

import TextInput from '@components/form/TextInput';
import ButtonSubmit from '@components/form/ButtonSubmit';
import ButtonCustom from '@components/form/ButtonCustom';
import DividerWithText from '@components/utils/DividerWithText';
import { Fonts } from '@core/constants/fontsContans';
import { validateForm } from '@core/auth/formValidator';

import { loginWithEmail } from '@core/root-store/actions/auth.action';
import { ReduxState } from '@core/interfaces/redux.interfaces';

const LoginScreen = ({ navigation }: any) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const { isSubmitting } = useSelector(({ auth }: ReduxState) => ({
        isSubmitting: auth.loanding
    }), shallowEqual);
    
    const [secureText, setSecureText] = useState<boolean>(true);
    const { email, password, onChange, form } = useForm({
        email: '',
        password: '',
    });
    const [errorText, setErrorText] = useState({
        email: '',
        password: '',
    });
    /**
     *
     */
    const onLogin = async () => {
        // VALIDAR FORMULARIO
        const validator = await validateForm(form, {
            email: { required: true, email: true },
            password: { required: true, minLength: 6 },
        });
        //
        if (validator.valid) {
            // AUTH
            dispatch(loginWithEmail({ email, password }));
        } else {
            setErrorText(validator.newErrorText);
        }
    };

    const signInWithGoogle = async () => {
        try {
            // Obtener la información de la cuenta de Google
            // const { idToken }: any = await GoogleSignin.signIn();
        
            // console.log("ID Token de Google:", idToken);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.containerHeader}>
                <View style={styles.containerHeaderText}>
                    <Text style={styles.headerTitle}>{'¡Bienvenido!'}</Text>
                    <Text style={styles.headerDesc}>{'Ingresa por:'}</Text>
                </View>
                <ButtonCustom
                    mode={'outlined'}
                    style={{
                        borderRadius: 10,
                        borderColor: theme.colors.custom_grey
                    }}
                    contentStyle={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: theme.colors.custom_grey
                    }}
                    labelStyle={{
                        fontSize: 16,
                        fontFamily: Fonts.ManropeMedium
                    }}
                    textColor={theme.colors.custom_grey}
                    icon={'google'}
                    onPress={signInWithGoogle}
                >
                    Google
                </ButtonCustom>
                <DividerWithText text={'O'} />
                <TextInput
                    label={'Correo electrónico'}
                    placeholder={'correo@ejemplo.com'}
                    returnKeyType="next"
                    value={email}
                    onChangeText={value => onChange(value, 'email')}
                    error={errorText.email !== ''}
                    errorText={errorText.email}
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    onSubmitEditing={onLogin}
                    autoCorrect={false}
                    left={
                        <Input.Icon
                            icon={'email-outline'}
                            color={theme.colors.custom_grey}
                        />
                    }
                />
                <TextInput
                    label={'Contraseña'}
                    placeholder={'************'}
                    returnKeyType="done"
                    value={password}
                    onChangeText={value => onChange(value, 'password')}
                    error={errorText.password !== ''}
                    errorText={errorText.password}
                    secureTextEntry={secureText}
                    onSubmitEditing={onLogin}
                    autoCapitalize="none"
                    autoCorrect={false}
                    left={
                        <Input.Icon
                            icon={secureText ? 'eye' : 'eye-off'}
                            color={theme.colors.custom_grey}
                            onPress={() => {
                                setSecureText(!secureText);
                            }}
                        />
                    }
                />
                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('forgot-password')}
                    >
                        <Text style={styles.forgotPasswordText}>{'Olvidaste tu contraseña?'}</Text>
                    </TouchableOpacity>
                </View>
                {/* BUTTON SUBMIT */}
                <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onLogin}>{'Iniciar Sesión'}</ButtonSubmit>

                <View style={{ marginVertical: 6 }}>
                    <Text style={styles.registerText} numberOfLines={1}>
                        ¿No tienes cuenta? Regístrate
                    </Text>
                    <ButtonCustom
                        buttonColor={theme.colors.custom_green_dark}
                        textColor={theme.colors.surface}
                        onPress={() => navigation.navigate('register')}
                    >
                        Crear Cuenta
                    </ButtonCustom>
                </View>
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
        borderRadius: 10
    },
    containerHeaderText: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 25,
        fontFamily: Fonts.DMSansBold,
        paddingVertical: 6,
        color: theme.colors.custom_green_dark
    },
    headerDesc: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue,
        alignSelf: 'center'
    },
    /** ---- FORGET PASSWORD ---- */
    forgotPassword: {        
        marginVertical: 8
    },
    forgotPasswordText: {        
        color: theme.colors.custom_green_dark,
        fontFamily: Fonts.DMSansSemiBold,
        fontSize: 16,
        alignSelf: 'flex-end'
    },
    /** ---- REGISTER ---- */
    registerText: {        
        color: theme.colors.backdrop,
        marginVertical: 10,
        fontSize: 16,
        fontFamily: Fonts.DMSansSemiBold,
        alignSelf: 'center'
    },

});

export default LoginScreen;
