import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import { StackParams } from '@core/navigation';

// REDUX
import { useDispatch } from 'react-redux';
import { handleFilter } from '@core/root-store/actions/filter.action';

interface Props {
    category: {
        id: any;
        title: string;
        image: string;
    }
    navigation: NativeStackNavigationProp<StackParams, any, undefined>
}

export const CardCategory = ({ category, navigation }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();
    
    return (
        <Surface style={styles.card} elevation={1}>
            <Image
                source={{ uri: category.image }}
                style={styles.image}
                resizeMode="cover"
            />
            <TouchableOpacity
                onPress={() => {
                    dispatch(handleFilter({ category: category.id }));
                    navigation.navigate('catalog');
                }}
            >
                <View style={[
                    styles.labelContainer,
                ]}
                >
                    <Text style={[
                        styles.label
                    ]} numberOfLines={1}>
                        {category.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </Surface>
    );
};
  
const styles = StyleSheet.create({
    card: {
        width: 160,
        height: 180,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 12,
        borderEndEndRadius: 25,
        borderEndStartRadius: 25,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        backgroundColor: theme.colors.background
    },
    image: {
        width: '100%',
        height: '100%',
    },
    labelContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: theme.colors.surface,
        borderRadius: 40,
        paddingVertical: 6,
        paddingHorizontal: 8,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.custom_green_dark
    },
    label: {
        fontSize: 16,
        fontFamily: Fonts.DMSansBold,
        textAlign: 'center',
        color: theme.colors.custom_green_dark
    },
});