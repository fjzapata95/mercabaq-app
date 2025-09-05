import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@core/theme';

import { Fonts } from '@core/constants/fontsContans';

interface Props {
    text: string;
}

const DividerWithText = ({ text }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>{text}</Text>
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.custom_grey
    },
    text: {
        marginHorizontal: 10,
        color: theme.colors.custom_blue,
        fontSize: 20,
        fontFamily: Fonts.DMSansSemiBold
    },
});

export default DividerWithText;
