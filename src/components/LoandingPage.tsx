import React from 'react';
import { theme } from '@theme';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

interface Props {
    size: number | 30;
    color: string | 'red';
    background?: string
    text?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>
}

export const LoandingPage = ({ size, color, background = theme.colors.background, text, style, textStyle }: Props) => {
    return (
        <View style={[styles.overlayContent, {backgroundColor: background}, style]}>
            <View style={styles.container}>
                <ActivityIndicator color={color} size={size} />
                {text && (<Text style={[styles.label, textStyle]}>{text}</Text>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlayContent: {
        ...StyleSheet.absoluteFillObject
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    label: {
        color: theme.colors.surface,
        fontSize: 18,
        fontWeight: '600',
        textAlignVertical: 'center',
        alignSelf: 'center',
        marginTop: 12
    },
});