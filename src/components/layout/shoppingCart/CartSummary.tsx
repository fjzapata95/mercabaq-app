
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Summary } from '@components/card/Summary';
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
        padding: 6,
        marginHorizontal: 8,
        marginBottom: 8,
        ...Style.shadowStyle
    }
});
