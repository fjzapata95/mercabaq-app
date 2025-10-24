import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Linking, StyleSheet, Text, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { List } from 'react-native-paper';
//
import { theme } from '@theme';
import { Fonts } from '@core/constants/fontsContans';

import { AppBar } from '@components/AppBar';
import { StackParams } from '@core/navigation';
import { useForm } from '@hooks/useForm';
import { Style } from '@core/styles';
import { validateForm } from '@core/auth/formValidator';
import { Costs } from '@core/interfaces/cart.interfaces';
import apiHelpers from '@core/auth/apiHelpers';

// COMPONENTS
import { DeliveryMethod } from '@components/layout/checkout/DeliveryMethod';
import { ContactInformation } from '@components/layout/checkout/ContactInformation';
// import { MethodPayment } from '@components/layout/checkout/MethodPayment';
import { Confirmation } from '@components/layout/checkout/Confirmation';
import CheckboxInput from '@components/form/CheckboxInput';
import ButtonSubmit from '@components/form/ButtonSubmit';
import OrderSummaryModal from '@components/layout/checkout/OrderSummary';

// REDUX
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { showAlert } from '@core/root-store/actions/util.action';
import { clearCart } from '@core/root-store/actions/cart.action';

import { ReduxState } from '@core/interfaces/redux.interfaces';
import { Checkout, CheckoutResponse } from '@core/interfaces/checkout.interfaces';

interface Props extends NativeStackScreenProps<StackParams> {}

export const CheckoutScreen = ({ navigation }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();
    //
    const { user, cartProd } = useSelector(({ auth, cart }: ReduxState) => ({ user: auth.user, cartProd: cart.items }), shallowEqual);

    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
        deliveryMethod: true,
        contactInformation: false,
        methodPayment: false,
        confirmation: false
    });

    const [toggleOrderSummary, setToggleOrderSummary] = useState<boolean>(false);
    const [orderSummary, setOrderSummary] = useState<{id: any, subtotal: any, shipping: any, total: any}>({id: 0, subtotal: 0, shipping: 0, total: 0});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [expandedId, setExpandedId] = useState<any>('deliveryMethod');
    const handlePress = (expandedId: string | number) => {
        setExpandedId((current: string | number) =>
            current === expandedId ? undefined : expandedId
        );
        setExpanded((prev) => ({
            ...prev,
            [expandedId]: !prev[expandedId],
        }));
    };

    const dynamicListItemStyle = useCallback((key: string) => {
        return expanded[key] ? { backgroundColor: theme.colors.custom_blue } : {};
    }, [expanded]);

    const dynamicBodyItemStyle = useCallback((key: string) => {
        return expanded[key] ? {} : styles.itemContainerInactive;
    }, [expanded]);

    const { onChange, form } = useForm({
        montoTotal: '',
		moneda: 'COP',
		clienteId: '',
		direccionId: '',
		comentario: '',
		nombreReceptor: '',
        terms: ''
    });

    /**
     * 
     * @param data 
     */
    const handleCosts = (data: Costs) => {
        // ACTUALIZAR MONTO DEL PEDIDO
        onChange(data.total, 'montoTotal');
        // VALIDAR SI EL MODAL NO ESTA ABIERTO.
        if (!toggleOrderSummary) {
            // DATO DE LOS COSTOS
            setOrderSummary((item) => ({
                ...item,
                ...data
            }));
        }
    }
    
    /**
     *
     */
    const onCreate = useCallback(async () => {
        // VALIDAR FORMULARIO
        const validator = await validateForm(form, {
            montoTotal: { required: true, },
            direccionId: { required: false },
            nombreReceptor: { require: true },
            terms: { require: true }
        });
        //
        if (validator.valid) {
            // OBTENER DETALLE DEL PEDIDO
            const detail = await cartProd.map(obj => {
                return {
                    productoId: obj.id,
                    nombreProducto: obj.name,
                    cantidad: obj.quantity,
                    precio: obj.price,
                    subTotal: (+obj.price * obj.quantity),
                    sellerId: obj.seller
                }
            });
            // LOANDING
            setIsSubmitting(true);

            try {
                const { data: { data, error, message } } = await apiHelpers.post<CheckoutResponse>('pedido/create', {data: {...form, clienteId: user.id}, detail: detail});
                // VALIDAR 
                if ( error ) {
                    // MENSAJE PARA EL CLIENTE
                    dispatch(showAlert({show: true, message: message}))
                } else {
                    // CREAR SESION
                    const values: Checkout = {
                        name: `Pago a ${data.id}`,
                        invoice: `${data.id}`,
                        currency: "COP",
                        amount: `${orderSummary.total}`,
                        country: "co",
                        description:`Pedido #${data.id}`,
                        lang: "es",
                        method: "POST",
                    };
                    // CREAR SESION
                    const response = await apiHelpers.post("general/paysesion", values);
                    // VALIDAR ERROR
                    if (!response.data.error) {
                        // OBTENER IDSESION
                        const { sessionId } = response.data.data;
                        // OPEN EPAYCO
                        // openEpayco(sessionId);
                    }
                    // DATO DE LOS COSTOS
                    setOrderSummary((item) => ({
                        ...item,
                        id: data.id
                    }));
                    // MODAL
                    setToggleOrderSummary(true);
                    // LIMPIAR CARITO
                    dispatch(clearCart());
                }
                setIsSubmitting(false);
            } catch (error: any) {
                // VALIDAR SI SE OBTIENE LA RESPUESTA.
                if (error && error.data && error.data.message) {
                    // MENSAGE DE LA PETICION
                    dispatch(showAlert({show: true, message: error.data.message}));
                } else {
                    // MENSAJE POR DEFECTO
                    dispatch(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar la creación de su pedido en este momento. Por favor, verifica tus datos e intenta nuevamente.'}));
                }
                setIsSubmitting(false);
                console.error(error);
            }
        }
    }, [cartProd, form, user]);

    /**
     * 
     */
    const openEpayco = (sessionId: string) => {
        const url = `http://zupordesk.com/mercabaq/checkout/${sessionId}`;
        Linking.openURL(url).catch((err) =>
            console.error("Error al abrir ePayco:", err)
        );
    };

    /**
     * 
     */
    useEffect(() => {
        // VALIDAR SI HAY USUARIO
        if (user && user.name) {
            // ASIGNAR POR DEFECTO EL NOMBRE DEL USUARIO COMO RECEPTOR
            onChange(user.name, 'nombreReceptor');
        }
    }, [user]);
        
    /**
     * 
     */
    useEffect(() => { 
        setExpandedId('deliveryMethod');
        setExpanded((prev) => ({
            ...prev,
            deliveryMethod: true
        }));
    }, []);
    
    return (
        <View style={styles.container}>
            <AppBar 
                title={'Checkout'}
                navigation={navigation}
            />
            <View style={styles.body}>
                <KeyboardAwareScrollView>
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        <List.AccordionGroup
                            onAccordionPress={handlePress}
                            expandedId={expandedId}
                        >
                            <List.Accordion
                                id={'deliveryMethod'}
                                title="Método de entrega"
                                titleStyle={styles.listTitle}
                                rippleColor={'transparent'}
                                left={(props) => (
                                    <View {...props} style={[styles.listItem, dynamicListItemStyle('deliveryMethod') ]}>
                                        <Text {...props} style={styles.listItemText}>1</Text>
                                    </View>
                                )}
                                style={[
                                    styles.listContainer,
                                    dynamicBodyItemStyle('deliveryMethod')
                                ]}
                                theme={{ colors: { ...theme.colors, background: 'transparent' } }}
                            > 
                                <View style={styles.itemBody}>
                                    <DeliveryMethod onChangeText={onChange} data={form} next={handlePress} key={`delivery_method_id`} />
                                </View>
                            </List.Accordion>
                            
                            <View style={styles.itemDivider} />

                            <List.Accordion
                                id={'contactInformation'}
                                title="Información de Contacto"
                                titleStyle={styles.listTitle}
                                rippleColor={'transparent'}
                                left={(props) => (
                                    <View {...props} style={[styles.listItem, dynamicListItemStyle('contactInformation') ]}>
                                        <Text {...props} style={styles.listItemText}>2</Text>
                                    </View>
                                )}
                                style={[
                                    styles.listContainer,
                                    dynamicBodyItemStyle('contactInformation')
                                ]}
                                theme={{ colors: { ...theme.colors, background: 'transparent' } }}
                            >
                                <View style={styles.itemBody}>
                                    <ContactInformation onChangeText={onChange} data={form} next={handlePress} />
                                </View>
                            </List.Accordion>

                            <View style={styles.itemDivider} />

                            { /* <List.Accordion
                                id={'methodPayment'}
                                title="Forma de pago"
                                titleStyle={styles.listTitle}
                                rippleColor={'transparent'}
                                left={(props) => (
                                    <View {...props} style={[styles.listItem, dynamicListItemStyle('methodPayment') ]}>
                                        <Text {...props} style={styles.listItemText}>3</Text>
                                    </View>
                                )}
                                style={[
                                    styles.listContainer,
                                    dynamicBodyItemStyle('methodPayment')
                                ]}
                                theme={{ colors: { ...theme.colors, background: 'transparent' } }}
                            >
                                <View style={styles.itemBody}>
                                    <MethodPayment onChangeText={onChange} data={form} next={handlePress} />
                                </View>
                            </List.Accordion> */}

                            <View style={styles.itemDivider} />

                            <List.Accordion
                                id={'confirmation'}
                                title="Confirmación"
                                titleStyle={styles.listTitle}
                                rippleColor={'transparent'}
                                left={(props) => (
                                    <View {...props} style={[styles.listItem, dynamicListItemStyle('confirmation') ]}>
                                        <Text {...props} style={styles.listItemText}>3</Text>
                                    </View>
                                )}
                                style={[
                                    styles.listContainer,
                                    dynamicBodyItemStyle('confirmation')
                                ]}
                                theme={{ colors: { ...theme.colors, background: 'transparent' } }}
                            >
                                <View style={styles.itemBody}>
                                    <Confirmation handleCosts={handleCosts} key={`delivery_confirmation_id`}/>
                                </View>
                            </List.Accordion>
                        </List.AccordionGroup>
                    </KeyboardAvoidingView>
                </KeyboardAwareScrollView>

                {expandedId == 'confirmation' && (
                    <View style={{
                        backgroundColor: theme.colors.background,
                        padding: 14,
                        borderRadius: 10,
                        marginTop: 10,
                        ...Style.shadowStyle
                    }} >
                        <CheckboxInput isChecked={form.terms.toString() == '1'} value={1} onChangeText={(value) => onChange(value, 'terms')} style={styles.termsConditionText}>
                            Acepto los <Text style={{...styles.termsConditionText, color: theme.colors.custom_green_dark}}>{'términos y condiciones'}</Text>
                        </CheckboxInput>
                        <View style={{marginLeft: 4, paddingHorizontal: 8, alignSelf: 'center'}}>
                            {/* BUTTON SUBMIT */}
                            <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onCreate}>{'Confirmar pedido'}</ButtonSubmit>
                        </View>
                    </View>
                )}
            </View>
            { /** RESUMEN DEL PEDIDO UNA VEZ CREADO */}
            <OrderSummaryModal navigation={navigation} visible={toggleOrderSummary} order={orderSummary} handleToggle={setToggleOrderSummary} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        margin: 14
    },
    listContainer: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: theme.colors.background,
        ...Style.shadowStyle
    },
    itemContainerInactive: {
        borderEndEndRadius: 10,
        borderEndStartRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    },
    listTitle: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue
    },
    listItemActive: {
        color: theme.colors.custom_blue
    },
    listItem: {
        borderRadius: 50,
        width: 30,
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        marginLeft: 10,
        backgroundColor: theme.colors.custom_grey
    },
    listItemText: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.surface
    },
    itemDivider: {
        marginVertical: 5
    },
    itemBody: {
        marginLeft: -26,
        paddingRight: 14,
        backgroundColor: theme.colors.background,
        borderEndEndRadius: 10,
        borderEndStartRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    },
    termsConditionText: {
        color: theme.colors.custom_blue,
        fontFamily: Fonts.ManropeMedium,
        fontSize: 16
    }
});
