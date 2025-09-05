import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { List, Text } from 'react-native-paper';
//
import { theme } from '@theme';
import { StackParams } from '@core/navigation';
import { useForm } from '@hooks/useForm';
import { Fonts } from '@core/constants/fontsContans';
import { Style } from '@core/styles';
import { validateForm } from '@core/auth/formValidator';
import { useDispatch } from 'react-redux';
import { showAlert } from '@core/root-store/actions/util.action';
import { ImageProduct } from '@components/layout/my-business/imageProduct';
import { MainImage } from '@components/layout/my-business/MainImage';
import { ProductCreateResponse, ProductIdResponse } from '@core/interfaces/products.interfaces';

import ButtonSubmit from '@components/form/ButtonSubmit';
import apiHelpers from '@core/auth/apiHelpers';
import { AppBar } from '@components/AppBar';
import { FormProduct } from '@components/layout/my-business/FormProduct';

interface Props extends NativeStackScreenProps<StackParams> {}

export const UpdateProductScreen = (props: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const [product, setProduct] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [expandedId, setExpandedId] = useState<any>('info');
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
        info: true,
        documents: false,
        mainimage: false
    });
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

    const { onChange, setFormdata, form } = useForm({
        id: '',
        name: '',
        descripcion: '',
        um: '',
        freeShipping: true,
        status: true,
        stock: '',
        stockmax: 0,
        price: '',
        rating: 1,
        categoria: '',
        marca: 1,
        tipoenv: 2
    });
    const [errorText, setErrorText] = useState({
        id: '',
        name: '',
        descripcion: '',
        um: '',
        freeShipping: '',
        status:'',
        stock: '',
        price: '',
        rating: '',
        categoria: '',
        marca: '',
        tipoenv: ''
    });

    /**
     * MÉTODO PARA OBTENER PRODUCTO.
     */
    const getProductById = useCallback(async () => {
        setExpandedId('info');
        setExpanded((prev) => ({
            ...prev,
            info: true
        }));
        //
        try {
            const { params }: any = props.route;
            // VALIDAR ID DEL PRODUCTO
            if (params && params.id) {
                // OBTENER PRODUCTO POR ID.
                const { data: { data, error } } = await apiHelpers.get<ProductIdResponse>(`producto/get/${params.id}`);
                // VALIDAR
                if (!error) {
                    // ASIGNAR DATA
                    setFormdata({
                        id: data.id,
                        name: data.name,
                        descripcion: data.descripcion,
                        um: data.um,
                        stock: data.stock,
                        price: data.price,
                        categoria: data.categoria,
                    });
                }
            }
        } catch (error) {
            //
            console.log('GET PRODUCT ID - ERROR: ', error, typeof error);
        }
    }, [props.route.params]);

    /**
     *
     */
    const onUpdate = useCallback(async () => {
        // VALIDAR FORMULARIO
        const validator = await validateForm(form, {
            id: { required: true },
            name: { required: true },
            descripcion: { required: true },
            um: { required: true },
            stock: { required: true },
            price: { required: true },
            categoria: { required: true }
        });
        //
        if (validator.valid) {
            // LOANDING
            setIsSubmitting(true);
            try {
                const { data: { data, error, message } } = await apiHelpers.post<ProductCreateResponse>('producto/update', form);
                // VALIDAR 
                if ( error ) {
                    // MENSAJE PARA EL CLIENTE
                    dispatch(showAlert({show: true, message: message}))
                } else {
                    // ADICIONAR DATA.
                    setProduct(form);
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
                    dispatch(showAlert({show: true, message: 'Lo sentimos, pero no pudimos completar la actualización de su producto en este momento. Por favor, verifica tus datos e intenta nuevamente.'}));
                }
                setIsSubmitting(false);
                console.error(error.data);
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
            name: '',
            descripcion: '',
            um: '',
            freeShipping: true,
            status: true,
            stock: '',
            stockmax: 0,
            price: '',
            rating: 1,
            categoria: '',
            marca: 1,
            tipoenv: 2,
        });
        handlePress('info');
    }
        
    /**
     * OBTENER PRODUCTO.
     */
    useEffect(() => { getProductById(); }, [props.route.params]);

    return (
        <View style={styles.container}>
            <AppBar 
                title={'Actualizar Producto'}
                navigation={props.navigation}
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
                        <List.AccordionGroup
                            expandedId={expandedId}
                            // onAccordionPress={handlePress}
                        >
                            <List.Accordion
                                id={'info'}
                                title="Información del producto"
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
                                    {/** FORMULARIO */}
                                    <FormProduct form={form} errorText={errorText} onChange={onChange} />
                                    {/** BUTTONS */}
                                    <View style={{paddingHorizontal: 8, marginBottom: 10, alignSelf: 'center'}}>
                                        {/* BUTTON SUBMIT */}
                                        <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onUpdate}>{'Guardar cambios'}</ButtonSubmit>
                                    </View>
                                </View>
                            </List.Accordion>
                                                            
                            <View style={styles.itemDivider} />
                            
                            <List.Accordion
                                id={'documents'}
                                title="Imagenes"
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
                                    <ImageProduct product={product} handlePress={handlePress} update={true} />
                                </View>
                            </List.Accordion>

                            <List.Accordion
                                id={'mainimage'}
                                title="Banco de imagenes"
                                titleStyle={styles.listTitle}
                                rippleColor={'transparent'}
                                left={(props) => (
                                    <View {...props} style={[styles.listItem, dynamicListItemStyle('mainimage') ]}>
                                        <Text {...props} style={styles.listItemText}>2</Text>
                                    </View>
                                )}
                                style={[
                                    styles.listContainer,
                                    dynamicBodyItemStyle('mainimage')
                                ]}
                                theme={{ colors: { ...theme.colors, background: 'transparent' } }}
                            >
                                <View style={styles.itemBody}>
                                    <MainImage product={product} navigation={props.navigation} reset={reset} handlePress={handlePress} update={true} />
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
    }
});