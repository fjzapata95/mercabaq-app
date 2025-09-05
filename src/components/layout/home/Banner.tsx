import React, { useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { Text } from 'react-native-paper';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import { PaginationBanner } from '@components/layout/pagination/PaginationBanner';

/**
 * 
 */
const slides: { key: string, image: any }[] = [
    {
        key: 'guide-one',
        image: require("@assets/image/slider.png")
    },
    {
        key: 'guide-two',
        image: require("@assets/image/slider.png")
    }
];

const PAGE_WIDTH = 370;

export const Banner = () => {

    const progress = useSharedValue<number>(0);
	const ref = useRef<ICarouselInstance>(null);
 
	const onPressPagination = (index: number) => {
        const currentProgress = progress.value || 0;
        ref.current?.scrollTo({
          count: index - currentProgress,
          animated: true,
        });
    };
  
    return (
        <View style={styles.container}>
            <Carousel
                ref={ref}
                vertical={false}
                width={PAGE_WIDTH}
                height={430}
                data={slides}
                style={{ width: '100%' }}
                renderItem={({ item }) => (
                    <View style={styles.containerItem}>
                        <Text style={styles.title}>Bienvenido a tu</Text>
                        <Text style={styles.brandName}>MERCADO{'\n'}A LA MANO</Text>
                        <Text style={styles.description}>
                            Conecta con compradores locales y revoluciona{'\n'}
                            tu forma de hacer compras.
                        </Text>
                        <Text style={styles.subtitle}>
                            ¡Tu mercado está a solo un clic de distancia!
                        </Text>
                        <View style={styles.slide}>
                            <Image style={styles.stepImage} source={item.image} resizeMode={'cover'} />
                        </View>
                    </View>
                )}
                onSnapToItem={(newProgress) => {
                    progress.value = newProgress;
                }}
            />

            <PaginationBanner<{ key: string }>
				progress={progress}
				data={slides.map(({ key }) => ({ key }))}
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
        paddingTop: 10,
        paddingHorizontal: 12,
        backgroundColor: theme.colors.background
    },
    containerItem: {
        paddingHorizontal: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.background
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue
    },
    brandName: {
        fontSize: 36,
        fontFamily: Fonts.Volkswagen,
        color: theme.colors.custom_green,
        marginBottom: 10,
        lineHeight: 42
    },
    description: {
        fontSize: 16,
        color: theme.colors.custom_blue,
        marginBottom: 10,
        lineHeight: 22
    },
    subtitle: {
        fontSize: 14,
        color: theme.colors.custom_blue,
        fontWeight: 'bold'
    },
    slide: {
        marginVertical: 10,
        height: 220,
        width: 350
    },
    stepImage: {
        width: "100%",
        height: "100%",
        borderRadius: 8
    },
});