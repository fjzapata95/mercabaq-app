import React from 'react';
import { theme } from '@theme';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LogoAlcaldia } from '@components/svg/LogoAlcaldia';

export const CustomHeader = ({ navigation, buttonDrawer = true }: any) => (
    <View style={styles.container}>
        <View style={{width: '60%'}}>
            <LogoAlcaldia width="100%" height="100%" fill={theme.colors.surface} />
        </View>
        {/* Iconos a la derecha */}
        { buttonDrawer && (
            <View style={styles.containerIcon}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={28} color={theme.colors.surface} />
                </TouchableOpacity>
            </View>
        )}
    </View>
)


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        backgroundColor: theme.colors.custom_blue, 
        height: 120, 
        paddingHorizontal: 16,
        paddingTop: 20
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});