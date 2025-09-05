
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Summary } from '@components/card/Summary';
import { Fonts } from '@core/constants/fontsContans';
import { Style } from '@core/styles';
import { theme } from '@core/theme';
import { Costs } from '@core/interfaces/cart.interfaces';

interface Props {
    handleCosts: (costs: Costs) => void;
}

export const CartSummary = ({ handleCosts }: Props) => {
    return (
        <View style={styles.container}>
            <Summary handleCosts={handleCosts}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 12,
        ...Style.shadowStyle
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        fontFamily: Fonts.DMSansRegular,
        color: theme.colors.custom_blue
    },
    amount: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue
    },
    positive: {
        color: theme.colors.custom_green_dark
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
        marginTop: 10,
    },
    totalText: {
        fontSize: 30,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue,
    },
    totalAmount: {
        fontSize: 30,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_green_dark,
    },
    protectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    protectionTextContainer: {
        marginLeft: 10,
    },
    protectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_green_dark
    },
    protectionDescription: {
        fontSize: 16,
        fontFamily: Fonts.DMSansRegular,
        color: theme.colors.custom_blue
    }
});
