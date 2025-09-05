import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-paper';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import { StackParams } from '@core/navigation';

interface Props extends NativeStackScreenProps<StackParams> {}

export const ProductHeader = ({navigation}: Props) => {
    return (
        <View style={styles.container}>
            {/* Breadcrumbs */}
            <View style={styles.breadcrumbs}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('home');
                    }}
                >
                    <Text style={styles.breadcrumbText}>Inicio</Text>
                </TouchableOpacity>
                <Icon name={'chevron-right'} size={22} color={theme.colors.custom_green_dark}/>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('catalog');
                    }}
                >
                    <Text style={styles.breadcrumbText}>Catálogo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        paddingTop: 8,
        paddingBottom: 12
    },
    breadcrumbs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 16
    },
    breadcrumbText: {
        fontSize: 16,
        fontFamily: Fonts.DMSansRegular,
        color: theme.colors.custom_grey
    }
});