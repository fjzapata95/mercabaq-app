import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Image, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { StackParams } from '@core/navigation';

import { theme } from '@core/theme';
import { ImagesResponse, Product, } from '@core/interfaces/products.interfaces';
import { PaginationBanner } from '@components/layout/pagination/PaginationBanner';
import apiHelpers from '@core/auth/apiHelpers';

interface Props extends NativeStackScreenProps<StackParams> {
    product: Product
}

const PAGE_WIDTH = 370;

export const ProductBanner = ({ product }: Props) => {

    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const [images, setImages] = useState<string[]>([]);

    /**
     * MÉTODO IMAGENES DEL PRODUCTO.
     */
    const getImagesById = useCallback(async () => {
        //
        try {
            const { id }: any = product;
            // VALIDAR ID DEL PRODUCTO
            if (id) {
                // OBTENER PRODUCTO POR ID.
                const { data: { data } } = await apiHelpers.get<ImagesResponse>(`proimg/get/${id}`);
                // ASIGNACIÓN DE DATOS.
                setImages(data.images);
            }
        } catch (error) {
            //
            console.log('GET IMAGES PRODUCT ID - ERROR: ', error, typeof error);
            // 
            setImages([]);
        }
    }, [product]);

    /**
     * PAGINACION SLIDER
     * @param index 
     */
    const onPressPagination = (index: number) => {
        const currentProgress = progress.value || 0;
        ref.current?.scrollTo({
          count: index - currentProgress,
          animated: true,
        });
    };
        
    /**
     * OBTENER IMAGENES DEL PRODUCTO.
     */
    useEffect(() => { getImagesById(); }, [product]);

    
    useEffect(() => { console.log('images', images); }, [images]);
    
    return (
        <View style={styles.container}>
            <Carousel
                ref={ref}
                vertical={false}
                width={PAGE_WIDTH}
                height={280}
                data={images}
                style={{ width: '100%', marginBottom: 10 }}
                renderItem={({ item }) => (
                    <View style={styles.containerItem}>
                        <Image style={styles.stepImage} src={item} alt={item} resizeMode={'cover'} />
                    </View>
                )}
                onSnapToItem={(newProgress) => {
                    progress.value = newProgress;
                }}
            />

            <PaginationBanner<string>
				progress={progress}
				data={images}
				size={10}
				dotStyle={{
					borderRadius: 100,
					backgroundColor: theme.colors.custom_grey
				}}
				activeDotStyle={{
					borderRadius: 100,
					overflow: "hidden",
					backgroundColor: theme.colors.custom_green_dark
				}}
				containerStyle={[
					{
						gap: 5,
                        marginTop: 4,
						marginBottom: 12
					},
				]}
				horizontal
				onPress={onPressPagination}
			/>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        backgroundColor: theme.colors.background
    },
    containerItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.background
    },
    stepImage: {
        width: "100%",
        height: "100%",
        borderRadius: 8
    }
});