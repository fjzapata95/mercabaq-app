import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { List, Provider, Text } from 'react-native-paper';
//
import { theme } from '@theme';
import { StackParams } from '@core/navigation';
import { useForm } from '@hooks/useForm';
import TextInput from '@components/form/TextInput';
import ComboBox from '@components/form/ComboBox';
import { Style } from '@core/styles';
import { Fonts } from '@core/constants/fontsContans';
import { validateForm } from '@core/auth/formValidator';
import { useDispatch } from 'react-redux';
import ButtonSubmit from '@components/form/ButtonSubmit';
import apiHelpers from '@core/auth/apiHelpers';
import { showAlert } from '@core/root-store/actions/util.action';
import { BusinessResponse } from '@core/interfaces/business.interfaces';
import { DocBusiness } from '@components/layout/my-business/DocBusiness';

interface Props extends NativeStackScreenProps<StackParams> {}

export const CreateBusiness = (props: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
        info: true,
        documents: false,
    });
    const [business, setBusiness] = useState<any>({});
    const [expandedId, setExpandedId] = useState<any>('info');
    
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
        tipoPersona: '',
        tipoDocumento: '',
        nombreRazonSocial: '',
        nombreMostrar: '',
        numeroDocumento: '',
        whatsapp: '',
    });
    const [errorText, setErrorText] = useState({
        tipoPersona: '',
        tipoDocumento: '',
        nombreRazonSocial: '',
        nombreMostrar: '',
        numeroDocumento: '',
        whatsapp: '',
    });

    /**
     *
     */
    const onCreate = useCallback(async () => {
        // VALIDAR FORMULARIO
        const validator = await validateForm(form, {
            tipoPersona: { required: true },
            tipoDocumento: { required: true },
            nombreRazonSocial: { required: true },
            nombreMostrar: { required: true },
            numeroDocumento: { required: true },
            whatsapp: { required: false, digits: true },
        });
        //
        if (validator.valid) {
            // LOANDING
            setIsSubmitting(true);
            try {
                const { data: { data, error, message } } = await apiHelpers.post<BusinessResponse>('negocio/create', {...form, whatsapp: (() => {
                    const phone = (form.whatsapp || "").replace(/\s/g, "");
                    return phone.startsWith("+57")
                    ? phone
                    : `+57${phone.replace(/^(\+)?57/, "")}`;
                })()});
                // VALIDAR 
                if ( error ) {
                    // MENSAJE PARA EL CLIENTE
                    dispatch(showAlert({show: true, message: message}))
                } else {
                    // ADICIONAR DATA.
                    setBusiness(data);
                    // IR AL SIGUIENTE ITEM
                    handlePress('documents');
                }
                setIsSubmitting(false);
            } catch (error: any) {
                // VALIDAR SI SE OBTIENE LA RESPUESTA.
                if (error && error.data && error.data.message) {
                    // MENSAGE DE LA PETICION
                    dispatch(showAlert({show: true, message: error.data.message}));
                } else {
                    // MENSAJE POR DEFECTO
                    dispatch(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar la creación de su negocio en este momento. Por favor, verifica tus datos e intenta nuevamente.'}));
                }
                setIsSubmitting(false);
                console.error(error);
            }
        } else {
            setErrorText(validator.newErrorText);
        }
    }, [form]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                >
                    <View style={styles.body}>
                        <List.AccordionGroup
                            expandedId={expandedId}
                            // onAccordionPress={handlePress}
                        >
                            <List.Accordion
                                id={'info'}
                                title="Información"
                                titleStyle={styles.listTitle}
                                rippleColor={'transparent'}
                                left={(props) => (
                                    <View {...props} style={[styles.listItem, dynamicListItemStyle('info') ]}>
                                        <Text {...props} style={styles.listItemText}>1</Text>
                                    </View>
                                )}
                                style={[
                                    styles.listContainer,
                                    dynamicBodyItemStyle('info')
                                ]}
                                theme={{ colors: { ...theme.colors, background: 'transparent' } }}
                            > 
                                <View style={styles.itemBody}>
                                    <View>
                                        <Text>Información de tu negocio</Text>
                                    </View>
                                    <ComboBox
                                        label={'Tipo de persona'}
                                        value={form.tipoPersona}
                                        remote={true} 
                                        dataUrl={'tipopers/get'}
                                        objLabel={'nombre'}
                                        onChangeText={(value) => onChange(value, 'tipoPersona')}
                                        errorText={errorText.tipoPersona}
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
                                        label={'Nombre/Razón Social'}
                                        placeholder={'Nombre o Razón Social'}
                                        value={form.nombreRazonSocial}
                                        onChangeText={(value) => onChange(value, 'nombreRazonSocial')}
                                        error={errorText.nombreRazonSocial !== ''}
                                    />
                                    <TextInput
                                        label={'Nombre Negocio'}
                                        placeholder={'Nombre que se mostrará a los compradores'}
                                        multiline
                                        value={form.nombreMostrar}
                                        onChangeText={(value) => onChange(value, 'nombreMostrar')}
                                        error={errorText.nombreMostrar !== ''}
                                    />
                                    <TextInput
                                        label={'Número de documento'}
                                        placeholder={'CC. 00000000'}
                                        returnKeyType="next"
                                        value={form.numeroDocumento}
                                        onChangeText={value => onChange(value, 'numeroDocumento')}
                                        error={errorText.numeroDocumento !== ''}
                                    />
                                    <TextInput
                                        label={'Whatsapp'}
                                        placeholder={'3000000000'}
                                        returnKeyType="next"
                                        value={form.whatsapp}
                                        onChangeText={value => onChange(value, 'whatsapp')}
                                        error={errorText.whatsapp !== ''}
                                    />
                                    {/** BUTTONS */}
                                    <View style={{paddingHorizontal: 8, marginBottom: 10, alignSelf: 'center'}}>
                                        {/* BUTTON SUBMIT */}
                                        <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onCreate}>{'Crear Negocio'}</ButtonSubmit>
                                    </View>
                                </View>
                            </List.Accordion>
                            
                            <View style={styles.itemDivider} />
                            
                            <List.Accordion
                                id={'documents'}
                                title="Documentos"
                                titleStyle={styles.listTitle}
                                rippleColor={'transparent'}
                                left={(props) => (
                                    <View {...props} style={[styles.listItem, dynamicListItemStyle('documents') ]}>
                                        <Text {...props} style={styles.listItemText}>2</Text>
                                    </View>
                                )}
                                style={[
                                    styles.listContainer,
                                    dynamicBodyItemStyle('documents')
                                ]}
                                theme={{ colors: { ...theme.colors, background: 'transparent' } }}
                            >
                                <View style={styles.itemBody}>
                                    <DocBusiness business={business} />
                                </View>
                            </List.Accordion>
                        </List.AccordionGroup>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        backgroundColor: theme.colors.background
    },
    listTitle: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue
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
});
