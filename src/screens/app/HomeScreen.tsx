import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Provider } from 'react-native-paper';

import { Banner } from '@components/layout/home/Banner';
import { FeaturedCategories } from '@components/layout/home/FeaturedCategories';
import { FeaturedProducts } from '@components/layout/home/FeaturedProducts';
import { StackParams } from '@core/navigation';

interface Props extends NativeStackScreenProps<StackParams> {}

export const HomeScreen = (props: Props) => {

    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={styles.contentScroll}
                >
                    {/** SLIDER DE BIENVENIDA */}
                    <Banner/>
                    {/** CATEGORIAS */}
                    <FeaturedCategories {...props} />
                    {/** PRODUCTOS */}
                    <FeaturedProducts {...props} />
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentScroll: {
        flexGrow: 1,
        paddingBottom: 20
    }
});
