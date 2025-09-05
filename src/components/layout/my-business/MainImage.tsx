import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import apiHelpers from '@core/auth/apiHelpers';
import { Fonts } from '@core/constants/fontsContans';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { theme } from '@core/theme';
import ButtonSubmit from '@components/form/ButtonSubmit';
import { useDispatch } from 'react-redux';
import { showAlert } from '@core/root-store/actions/util.action';
import { LoandingPage } from '@components/LoandingPage';
import { NotFound } from '@components/NotFound';
import ButtonCustom from '@components/form/ButtonCustom';

interface Props {
    product: any
    navigation: any
    update?: boolean;
    reset: () => void;
    handlePress: (expandedId: string | number) => void;
}

export const MainImage = ({ navigation, product, reset, handlePress, update = false }: Props ) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const [images, setOImages] = useState<any[]>([]);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * OBTENER LISTADO DE PEDIDOS PENDIENTES
     */
    const loadImagesProdById = useCallback(async () => {
        // LOANDING
        setLoading(true);
        try {
            if (product && product.id) {
                // 
                const { data: { data, error } } = await apiHelpers.get<any>(`proimg/get/${product.id}`);
                // VALIDAR SI SE OBTUVO DATOS
                if (!error) {
                    // ASIGNAR DATOS
                    setOImages(data.images);
                } else {
                    // ASIGNAR DATOS
                    setOImages([]);
                }
            }
            setLoading(false);
        } catch (error) {
            setOImages([]);
            setLoading(false);
        }
    }, [product]);

    /**
     * 
     */
    const onMainImage = async () => {
        // VALIDAR SI TIENE UNA DIRECCCION SELECCIONADA
        if (selectedImage) {
            setIsSubmitting(true);
            // 
            const { data: { error, message } } = await apiHelpers.get<any>(`producto/changeimg/${selectedImage}`);
            // MENSAJE PARA EL CLIENTE
            dispatch(showAlert({show: true, message: message}));
            // VALIDAR SI SE OBTUVO DATOS
            if (!error) {
                // RESET FORM
                reset();
                // REDIRIGIR
                navigation.navigate('products');
            }
            setIsSubmitting(false)
        } else {
            // MENSAJE PARA EL CLIENTE
            dispatch(showAlert({show: true, message: 'Por favor, debe seleccionar la imagen principal del producto.'}))
        }
    }

    useEffect(() => {
        loadImagesProdById();
    }, [product]);
            
    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => setSelectedImage(item.id)}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.img }}
                    resizeMode={'contain'}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </View>
            { selectedImage === item.id && (
                <View style={styles.checkContainer}>
                    <IconFont
                        name={'check-circle'}
                        size={20}
                        color={theme.colors.custom_green_dark}
                    />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.colors.background }}>
            <Text variant="titleLarge" style={styles.title}>
                Imagenes del producto
            </Text>
            <View>
                <FlatList
                    data={images}
                    keyExtractor={(item, index) => `product_images-${index}`}
                    renderItem={renderItem}
                    numColumns={2}
                    style={{
                        backgroundColor: theme.colors.background
                    }}
                    columnWrapperStyle={styles.columnWrapper}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                />
                {/**
                 * LOANING
                */}
                {loading && (
                    <LoandingPage size={30} color={theme.colors.primary} text={'Cargando Imagenes...'} textStyle={{color: theme.colors.custom_blue}} />
                )}
                {/**
                 * NOTFOUNT
                */}
                {!loading && Object.keys(images).length == 0 && (
                    <NotFound text={'Aún no tienes imagenes registradas'} />
                )}
            </View>
            {/** BUTTONS */}
            <View style={{paddingHorizontal: 8, marginBottom: 10, alignSelf: 'center'}}>
                {/* BUTTON SUBMIT */}
                <ButtonSubmit mode="contained" loading={isSubmitting} disabled={isSubmitting} onPress={onMainImage}>{'Guardar Cambios'}</ButtonSubmit>
                
                {update && (
                    <ButtonCustom
                        compact
                        mode={'contained'}
                        style={{
                            width: 170
                        }}
                        textColor={theme.colors.surface}
                        buttonColor={theme.colors.custom_green_dark}
                        onPress={() => handlePress('documents')}
                    >
                        Atrás
                    </ButtonCustom>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_blue,
        paddingVertical: 20
    },
    imageContainer: {
        width: 160,
        height: 110,
        backgroundColor: theme.colors.custom_grey
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 12
    },
    checkContainer: {
        position: 'absolute',
        top: 10,
        right: 10
    },
});
