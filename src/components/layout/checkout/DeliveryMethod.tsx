import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Divider, Text } from 'react-native-paper';
import apiHelpers from '@core/auth/apiHelpers';
import { useDispatch } from 'react-redux';

import { theme } from '@core/theme';
import { Style } from '@core/styles';
import { Fonts } from '@core/constants/fontsContans';
import { Props } from '@core/interfaces/checkout.interfaces';
import { Address, AddressesRequest, AddressesResponse } from '@core/interfaces/address.interfaces';

import ButtonCustom from '@components/form/ButtonCustom';
import CheckboxInput from '@components/form/CheckboxInput';
import { LoandingPage } from '@components/LoandingPage';
import { NotFound } from '@components/NotFound';
import { useForm } from '@hooks/useForm';
import ButtonSubmit from '@components/form/ButtonSubmit';
import { validateForm } from '@core/auth/formValidator';
import { showAlert } from '@core/root-store/actions/util.action';
import { FormAddress } from '@components/layout/addresses/FormAddress';

export const DeliveryMethod = <T extends Record<string, string>>({ data, onChangeText, next }: Props<T>) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const [selectedMethod, setSelectedMethod] = useState<string>("home");
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [addAddress, setAddAddress] = useState<boolean>(false);

    const { onChange, form } = useForm({
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
     * @param method 
     */
    const handleSelect = (method: React.SetStateAction<string>) => {
        setSelectedMethod(method);
        //
        if (method == 'home') {
            //
            onChangeText('', 'direccionId')
        } else {
            //
            setAddAddress(false);
            onChangeText(0, 'direccionId')
        }
    };

    /**
     * 
     */
    const handlePress = useCallback((value: string) => {
        // VALIDAR SI TIENE UNA DIRECCCION SELECCIONADA
        if ((data.direccionId && data.direccionId != '0') ||  selectedMethod == 'pickup') {
            // SIGUIENTE
            next(value);
        } else {
            // MENSAJE PARA EL CLIENTE
            dispatch(showAlert({show: true, message: 'Por favor, selecciona una dirección antes de continuar.'}))
        }
    }, [data, selectedMethod]);

    /**
     * OBTENER LISTADO DE DIRECCIONES DEL USUARIO
     */
    const loadAddresses = async () => {
        // LOANDING
        setLoading(true);
        try {
            const { data: { data, error } } = await apiHelpers.get<AddressesResponse>('dir/get');
            // VALOR POR DEFECTO
            let result: Address[] = [];
            // VALIDAR SI SE OBTUVIERON DATOS
            if (!error) result = data;
            // ASIGNAR DATOS
            setAddresses(result);
            setLoading(false);
        } catch (error) {
            setAddresses([]);
            setLoading(false);
            console.error(error);
        }
    };
    /**
     *
     */
    const onCreateAddress = useCallback(async () => {
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
                const { data: { data, error, message } } = await apiHelpers.post<AddressesRequest>('dir/create', params);
                // VALIDAR 
                if ( error ) {
                    // MENSAJE PARA EL CLIENTE
                    dispatch(showAlert({show: true, message: message}))
                } else {
                    // ADICIONAR DIRECCIONES.
                    setAddresses((prevAddresses) => [data, ...prevAddresses]);
                    // CERRAR FORMULARIO
                    setAddAddress(false);
                    // VALIDAR SI ENCUENTRA LA DIRECCION
                    if (data && data.id) {
                        // AGREGA SELECCION POR DEFECTO
                        onChangeText(data.id, 'direccionId')
                    }
                }
                setIsSubmitting(false);
            } catch (error) {
                dispatch(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar la creación de la dirección en este momento. Por favor, verifica tus datos e intenta nuevamente.'}));
                setIsSubmitting(false);
                console.error(error);
            }
        } else {
            setErrorText(validator.newErrorText);
        }
    }, [form, addresses]);

    useEffect(() => {
        loadAddresses();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Escoge el método de entrega:</Text>
            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    onPress={() => handleSelect("home")}
                    style={
                        selectedMethod === "home"
                          ? [styles.card, styles.selected]
                          : styles.card
                    }
                >
                    { selectedMethod === "home" && (
                        <View style={styles.checkContainer}>
                            <IconFont
                                name={'check-circle'}
                                size={20}
                                color={theme.colors.custom_green_dark}
                            />
                        </View>
                    )}
                    <View style={styles.iconContainer}>
                        <IconFeather
                            name={'truck'}
                            size={32}
                            color={theme.colors.custom_green_dark}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>A domicilio</Text>
                        <Text style={[styles.text, {fontSize: 9}]}>Entrega en 2-3 días hábiles</Text>
                    </View>
                    <Text style={styles.textCost}>COSTO DE ENVÍO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleSelect("pickup")}
                    style={
                        selectedMethod === "pickup"
                          ? [styles.card, styles.selected]
                          : styles.card
                    }
                >
                    { selectedMethod === "pickup" && (
                        <View style={styles.checkContainer}>
                            <IconFont
                                name={'check-circle'}
                                size={20}
                                color={theme.colors.custom_green_dark}
                            />
                        </View>
                    )}
                    <View style={styles.iconContainer}>
                        <IconIonicon 
                            name="storefront-outline" 
                            size={32} 
                            color={theme.colors.custom_green_dark}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>En punto de entrega</Text>
                    </View>
                    <Text style={styles.textCost}>GRATIS</Text>
                </TouchableOpacity>
            </View>

            <Divider style={{marginVertical: 10}} />

            { selectedMethod === "home" && !addAddress && (
                <View style={{marginVertical: 1}}>
                    {addresses && addresses.map(obj => (
                        <View style={{marginVertical: 6}}>
                            <CheckboxInput key={`address_${obj.id}`} isChecked={(data.direccionId == obj.id.toString())} value={obj.id} onChangeText={(value) => onChangeText(value, 'direccionId')} style={styles.itemText}>
                                {obj.complemento} <Text style={{...styles.itemText, color: theme.colors.custom_green_dark}}>{obj.ciudad}/{obj.departamento}</Text>
                            </CheckboxInput>
                        </View>
                    ))}
                    {/**
                     * LOANING
                    */}
                    {loading && (
                        <LoandingPage size={30} color={theme.colors.primary} text={'Cargando Direcciones...'} textStyle={{color: theme.colors.custom_blue}} />
                    )}
                    {/**
                     * NOTFOUNT
                    */}
                    {!loading && Object.keys(addresses).length == 0 && (
                        <NotFound text={'Aún no tienes direcciones registradas'} />
                    )}
                </View>
            )}

            { selectedMethod === "home" && addAddress && (
                <View>
                    {/** FORMULARIO */}
                    <FormAddress form={form} errorText={errorText} onChange={onChange} />
                    {/** BUTTONS */}
                    <View style={{paddingHorizontal: 8, marginBottom: 10, alignSelf: 'center'}}>
                        {/* BUTTON SUBMIT */}
                        <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onCreateAddress}>{'Guardar Dirección'}</ButtonSubmit>
                        <ButtonCustom
                            mode={'outlined'}
                            style={{
                                borderRadius: 30,
                                borderColor: theme.colors.custom_grey,
                                marginVertical: 1,
                            }}
                            contentStyle={{
                                borderRadius: 30,
                                borderWidth: 1,
                                borderColor: theme.colors.custom_grey,
                                width: 180
                            }}
                            labelStyle={{
                                fontSize: 16,
                                fontFamily: Fonts.ManropeMedium
                            }}
                            textColor={theme.colors.custom_grey}
                            onPress={() => setAddAddress(false)}
                        >
                            Cancelar
                        </ButtonCustom>
                    </View>
                </View>
            )}

            {/**CONTINUAR O AGREGAR NUEVA DIRECCIÓN */}
            { !addAddress && (
                <View style={{paddingHorizontal: 8, marginBottom: 10, alignSelf: 'center'}}>
                    <ButtonCustom
                        mode='contained'
                        style={{
                            width: 210,
                            borderRadius: 30,
                        }}
                        buttonColor={theme.colors.custom_blue}
                        textColor={theme.colors.surface}
                        onPress={() => handlePress('contactInformation')}
                    >
                        Continuar
                    </ButtonCustom>

                    <TouchableOpacity style={styles.addAddressButton} onPress={() => setAddAddress(true)}>
                        <Text style={styles.addAddressText}>Agregar nueva dirección</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        // padding: 16
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.DMSansMedium,
        color: theme.colors.custom_grey,
        marginBottom: 16,
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    card: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 4,
        borderWidth: 0.6,
        borderColor: theme.colors.custom_grey
    },
    selected: {
        borderColor: theme.colors.custom_green_dark
    },
    checkContainer: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    iconContainer: {
        ...Style.shadowStyle,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        width: 54,
        height: 54,
        borderRadius: 50,
        padding: 11,
        marginVertical: 6,
        backgroundColor: theme.colors.background
    },
    textContainer: {
        height: 50
    },
    text: {
        fontSize: 18,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_blue,
        textAlign: "center"
    },
    textCost: {
        fontSize: 14,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_green_dark,
        marginVertical: 10
    },
    /**
     * OPCIONES DIRECCIONES
     */
    itemText: {        
        color: theme.colors.custom_grey,
        fontFamily: Fonts.ManropeMedium,
        fontSize: 16
    },

    addAddressButton: {
        backgroundColor: theme.colors.custom_green_dark,
        padding: 12,
        borderRadius: 50,
        elevation: 5,
    },
    addAddressText: {
        color: theme.colors.surface,
        fontSize: 14,
        fontFamily: Fonts.ManropeBold,
        textAlign: 'center'
    },
});