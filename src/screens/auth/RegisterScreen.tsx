import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput as Input, Provider } from 'react-native-paper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
//
import { signUpEmail } from '@core/root-store/actions/auth.action';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { validateForm } from '@core/auth/formValidator';
import { Fonts } from '@core/constants/fontsContans';
import { useForm } from '@hooks/useForm';
import { theme } from '@theme';

import TextInput from '@components/form/TextInput';
import ButtonSubmit from '@components/form/ButtonSubmit';
import ButtonCustom from '@components/form/ButtonCustom';
import DividerWithText from '@components/utils/DividerWithText';
import CheckboxInput from '@components/form/CheckboxInput';
import ComboBox from '@components/form/ComboBox';

const RegisterScreen = ({ navigation }: any) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const { isSubmitting } = useSelector(({ auth }: ReduxState) => ({
        isSubmitting: auth.loanding
    }), shallowEqual);
    
    const [secureText, setSecureText] = useState<boolean>(true);
    const { onChange, form } = useForm({
        name: '',
        telefono: '',
        email: '',
        tipoDocumento: '',
        documento: '',
        password: '',
        rol: 1
    });
    const [errorText, setErrorText] = useState({
        name: '',
        telefono: '',
        email: '',
        tipoDocumento: '',
        documento: '',
        password: '',
        rol: ''
    });
    /**
     *
     */
    const onSignUp = async () => {
        // VALIDAR FORMULARIO
        const validator = await validateForm(form, {
            name: { required: true },
            telefono: { required: true },
            email: { required: true, email: true },
            password: { required: true, minLength: 6 },
            tipoDocumento: { required: true },
            documento: { required: true }
        });
        //
        if (validator.valid) {
            // SIGNUP
            dispatch(signUpEmail({ ...form }));
        } else {
            setErrorText(validator.newErrorText);
        }
    };

    return (
        <Provider>
            <KeyboardAwareScrollView>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <View style={styles.containerHeader}>
                        <View style={styles.containerHeaderText}>
                            <Text style={styles.headerTitle}>{'Crear cuenta'}</Text>
                            <Text style={styles.headerDesc}>{'¡Únete a nuestra comunidad!'}</Text>
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
                        >
                            Google
                        </ButtonCustom>
                        <DividerWithText text={'O'} />
                        <TextInput
                            label={'Nombre completo'}
                            placeholder={'Nombre y apellido'}
                            returnKeyType="next"
                            value={form.name}
                            onChangeText={value => onChange(value, 'name')}
                            error={errorText.name !== ''}
                            errorText={errorText.name}
                        />
                        <TextInput
                            label={'Correo electrónico'}
                            placeholder={'correo@ejemplo.com'}
                            returnKeyType="next"
                            value={form.email}
                            onChangeText={value => onChange(value, 'email')}
                            autoCapitalize="none"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            autoCorrect={false}
                            error={errorText.email !== ''}
                            errorText={errorText.email}
                        />
                        <ComboBox
                            label={'Tipo de documento'}
                            value={form.tipoDocumento}
                            remote={true} 
                            dataUrl={'tipodoc/get'}
                            objLabel={'nombre'}
                            onChangeText={(value) => onChange(value, 'tipoDocumento')}
                            errorText={errorText.tipoDocumento}
                        />
                        <TextInput
                            label={'Número de documento'}
                            placeholder={'CC. 00000000'}
                            returnKeyType="next"
                            value={form.documento}
                            onChangeText={value => onChange(value, 'documento')}
                            error={errorText.documento !== ''}
                            errorText={errorText.documento}
                        />
                        <TextInput
                            label={'Teléfono'}
                            placeholder={'+57 000 000 0000'}
                            returnKeyType="next"
                            value={form.telefono}
                            onChangeText={value => onChange(value, 'telefono')}
                            error={errorText.telefono !== ''}
                            errorText={errorText.telefono}
                        />
                        <TextInput
                            label={'Contraseña'}
                            placeholder={'************'}
                            returnKeyType="done"
                            value={form.password}
                            onChangeText={value => onChange(value, 'password')}
                            secureTextEntry={secureText}
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
                            error={errorText.password !== ''}
                            errorText={errorText.password}
                        />
                        <View style={styles.termsCondition}>
                            <CheckboxInput isChecked={false} style={styles.termsConditionText}>
                                Acepto los <Text style={{...styles.termsConditionText, color: theme.colors.custom_green_dark}}>{'términos y condiciones'}</Text>
                            </CheckboxInput>
                        </View>
                        {/* BUTTON SUBMIT */}
                        <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onSignUp}>{'Crear cuenta'}</ButtonSubmit>

                        <TouchableOpacity
                            style={styles.login}
                            onPress={() => navigation.navigate('login')}
                        >
                            <Text style={styles.loginText}>¿Ya tienes una cuenta? <Text style={{...styles.loginText, textDecorationLine: 'underline', color: theme.colors.custom_green_dark}}>Inicia sesión</Text></Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </KeyboardAwareScrollView>
        </Provider>
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
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        borderRadius: 10,
        marginTop: 50
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
        alignSelf: 'center'
    },
    /** ---- FORGET PASSWORD ---- */
    termsCondition: {        
        marginVertical: 8
    },
    termsConditionText: {        
        color: theme.colors.custom_blue,
        fontFamily: Fonts.ManropeMedium,
        fontSize: 16
    },

    /** LOGIN */
    login: {
        alignSelf: 'center'
    },
    loginText: {
        color: theme.colors.custom_grey,
        fontSize: 16,
        fontFamily: Fonts.DMSansSemiBold
    }
});

export default RegisterScreen;
