import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import { Text, TouchableRipple } from 'react-native-paper';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';

interface Props {
    data: any;
    handleToggleFilter: (value: boolean) => void;
}

export const OrderHeader = ({ data, handleToggleFilter }: Props) => {
    return (
        <View style={styles.container}>

            {/* Breadcrumbs */}
            <View>
                {/* Header Title */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Pedidos</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
                <TouchableRipple
                    onPress={() => handleToggleFilter(true)}
                    style={styles.actionButton}
                    rippleColor={'transparent'}
                >
                    <View style={styles.actionContent}>
                        <IconFeather name="filter" size={20} color={theme.colors.custom_grey} />
                        <Text style={styles.actionText}>Filtrar por</Text>
                    </View>
                </TouchableRipple>
                <View style={{borderLeftWidth: 1, borderColor: theme.colors.custom_grey}} ></View>
                <TouchableRipple
                    style={styles.actionButton}
                    rippleColor={'transparent'}
                >
                    <View style={styles.actionContent}>
                        <Text style={styles.actionText}>Pedidos ({data.total}) </Text>
                    </View>
                </TouchableRipple>
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        paddingTop: 8,
        paddingBottom: 16
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue
    },
    headerSubtitle: {
        fontSize: 20,
        fontFamily: Fonts.DMSansRegular,
        color: theme.colors.custom_grey,
        marginLeft: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.custom_grey,
        height: 60
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center'
    },
    actionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 16,
        fontFamily: Fonts.ManropeMedium,
        color: theme.colors.custom_grey,
        marginLeft: 4
    }
});