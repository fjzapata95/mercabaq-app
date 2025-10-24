import React, { useCallback, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Caption, Divider, List, Modal, Portal, Text, Title } from 'react-native-paper';
import uuid from 'react-uuid';
//
import { theme } from '@theme';
import { AvatarImage } from '@components/utils/AvatarImage';
import { StackParams } from '@core/navigation';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { Fonts } from '@core/constants/fontsContans';
import { Style } from '@core/styles';

// COMPONENTS
import { SellerInfo } from '@components/layout/my-business/SellerInfo';
import ButtonSubmit from '@components/form/ButtonSubmit';
import apiHelpers from '@core/auth/apiHelpers';
import ButtonCustom from '@components/form/ButtonCustom';
import TextInput from '@components/form/TextInput';
import { useForm } from '@hooks/useForm';
import { validateForm } from '@core/auth/formValidator';
import { showAlert } from '@core/root-store/actions/util.action';
import { setBusinessData } from '@core/root-store/actions/auth.action';
// import { PendingOrders } from '@components/layout/my-business/PendingOrders';

interface Props extends NativeStackScreenProps<StackParams> {}

export const HomeScreen = (props: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();
    //
    const { user, business } = useSelector(({ auth }: ReduxState) => ({
        user: auth.user,
        business: auth.business
    }), shallowEqual);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [toggleModal, onToggleModal] = useState<boolean>(false);

    const { onChange, setFormdata, form } = useForm({
        descripcion: ''
    });

    const [errorText, setErrorText] = useState({
        descripcion: ''
    });

    const onSolRetiro = useCallback(async () => {
        //
        try {
            // VALIDAR FORMULARIO
            const validator = await validateForm(form, {
                descripcion: { required: false }
            });
            //
            if (validator.valid) {
                // VALIDAR ID DEL PRODUCTO
                if (business && business.id) {
                    // LOANDING
                    setIsSubmitting(true);
                    // OBTENER PRODUCTO POR ID.
                    const { data: { error } } = await apiHelpers.post<any>(`negocio/setsolretiro`, { id: business.id });
                    // VALIDAR 
                    if ( error ) {
                        // MENSAJE PARA EL CLIENTE
                        dispatch(showAlert({show: true, message: 'Ocurrió un problema al procesar la solicitud. Por favor, intenta nuevamente en unos minutos o contacta con soporte si el problema persiste.'}));
                    } else {
                        // MENSAJE PARA EL CLIENTE
                        dispatch(showAlert({show: true, message: 'Tu cuenta ha sido dada de baja exitosamente.'}));
                        // CERRAR MODAL
                        onToggleModal(false);
                        // ADICIONAR DATA.
                        dispatch(setBusinessData(null));
                    }
                    setIsSubmitting(false);
                }
            }
        } catch (error) {
            // MENSAJE PARA EL CLIENTE
            dispatch(showAlert({show: true, message: 'Ocurrió un problema al procesar la solicitud. Por favor, intenta nuevamente en unos minutos o contacta con soporte si el problema persiste.'}));
            setIsSubmitting(false);
            //
            console.log('SOLICITUD RETIRO - ERROR: ', error, typeof error);
        }
    }, [business]);
    
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    key={uuid()}
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                >
                    <View style={styles.userInfoSection}>
                        <View style={{ marginTop: 10, alignItems: 'center' }}>
                            <AvatarImage size={130}/>
                            <View>
                                <Title numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{user.name}</Title>
                                <Caption numberOfLines={1} ellipsizeMode="tail" style={styles.caption}>{user.email}</Caption>
                            </View>
                            <View style={styles.verifiedContainer}>
                                {business && business.estado ? (
                                    <View style={styles.verifiedContainer}>
                                        <Text style={styles.verifiedText}>Verificado</Text>
                                        <Image source={require("@assets/icons/check-verified.png")} style={{width: 24, height: 24}} />
                                    </View>
                                ) : (
                                    <Text style={styles.verifiedText}>No Verificado</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.card}>
                            <List.Item
                                title="Cumpleaños"
                                titleStyle={styles.cartTitle}
                                description="Aug 20, 1997"
                                descriptionStyle={styles.cartDescription}
                                left={(props) => <List.Icon {...props} icon="gift-outline" color={theme.colors.custom_green_dark} style={{...props.style, borderWidth: 1, borderColor: theme.colors.custom_green_dark, borderRadius: 6, padding: 6}} />}
                                style={styles.cardItem}
                            />
                            <List.Item
                                title="Cargo"
                                titleStyle={styles.cartTitle}
                                description="Vendedor"
                                descriptionStyle={styles.cartDescription}
                                left={(props) => <List.Icon {...props} icon="tag-outline" color={theme.colors.custom_green_dark} style={{...props.style, borderWidth: 1, borderColor: theme.colors.custom_green_dark, borderRadius: 6, padding: 6}} />}
                                style={styles.cardItem}
                            />
                            <View style={[styles.container, { paddingHorizontal: 12 }]}>
                                <ButtonCustom
                                    compact
                                    mode={'outlined'}
                                    style={{
                                        borderRadius: 20,
                                        borderColor: theme.colors.custom_green_dark,
                                        marginRight: 2
                                    }}
                                    contentStyle={{
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderColor: theme.colors.custom_green_dark
                                    }}
                                    textColor={theme.colors.custom_green_dark}
                                    onPress={() => onToggleModal(true)}
                                >
                                    Solicitar Baja
                                </ButtonCustom>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        {/** INDICADORES DEL VENDEDOR */}
                        <SellerInfo />
                        {/** PEDIDOS PENDIENTES */}
                        {/** <PendingOrders /> */}
                    </View>
                </ScrollView>
            </SafeAreaView>

            <Portal theme={theme}>
                <Modal visible={toggleModal} onDismiss={() => onToggleModal(false)} contentContainerStyle={styles.modal}>
                    <View>
                        <View style={styles.body}>
                            <Text style={styles.title2}>Dar de baja tu cuenta de vendedor</Text>
                            <Text style={styles.description}>Al dar de baja tu cuenta, tu perfil dejará de estar visible en la plataforma, tus productos ya no se mostrarán a los compradores y perderás el acceso a las herramientas de venta. Podrás volver a activar tu cuenta en el futuro si lo deseas, pero mientras esté inactiva no recibirás pedidos ni notificaciones.</Text>
                            <TextInput
                                label={'Motivo de la baja (opcional)'}
                                placeholder={'Escribe el motivo de la baja'}
                                multiline
                                value={form.descripcion}
                                onChangeText={(value) => onChange(value, 'descripcion')}
                                error={errorText.descripcion !== ''}
                            />
                        </View>
                        <Divider style={styles.divider} />
                        <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}} >
                            <ButtonCustom
                                compact
                                mode={'outlined'}
                                style={{
                                    borderRadius: 20,
                                    borderColor: theme.colors.custom_green_dark,
                                    width: 150,
                                    marginRight: 2
                                }}
                                contentStyle={{
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: theme.colors.custom_green_dark
                                }}
                                textColor={theme.colors.custom_green_dark}
                                onPress={() => onToggleModal(false)}
                            >
                                Cancelar
                            </ButtonCustom>
                            <ButtonSubmit 
                                mode="contained" 
                                style={{
                                    width: 150,
                                    marginLeft: 2
                                }}
                                loading={isSubmitting}
                                disabled={isSubmitting}
                                onPress={onSolRetiro}
                            >
                                Solicitar Baja
                            </ButtonSubmit>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userInfoSection: {
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 14,
        backgroundColor: theme.colors.background,
        ...Style.shadowStyle
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 10,
        backgroundColor: theme.colors.background
    },
    cardItem: {
        marginHorizontal: 20,
        marginVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.custom_grey
    },
    cartTitle: {
        fontSize: 16,
        fontFamily: Fonts.InterMedium,
        color: '#2E2E2E'
    },
    cartDescription: {
        fontSize: 14,
        fontFamily: Fonts.InterRegular,
        color: '#71747D'
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.InterMedium,
        color: theme.colors.custom_blue,
        textAlign: 'center'
    },
    caption: {
        fontSize: 14,
        fontFamily: Fonts.InterMedium,
        lineHeight: 14,
        color: theme.colors.custom_grey
    },

    verifiedContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    verifiedText: {
        fontSize: 16,
        fontFamily: Fonts.DMSansRegular,
        color: theme.colors.custom_blue,
        marginRight: 2
    },

    modal: {
        backgroundColor: theme.colors.background,
        borderRadius: 4,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 16
    },

    body: {
        marginHorizontal: 12
    },

    divider: {
        marginVertical: 8
    },
    title2: {
        fontSize: 20,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_green_dark,
        textAlign: 'center',
        marginBottom: 10
    },
    description: {
        fontSize: 14,
        fontFamily: Fonts.ManropeRegular,
        color: theme.colors.custom_blue,
        textAlign: 'center',
        marginBottom: 2
    },
});
