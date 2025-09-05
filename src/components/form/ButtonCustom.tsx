import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '@theme';
import { Fonts } from '@core/constants/fontsContans';

type Props = React.ComponentProps<typeof PaperButton>;

const ButtonCustom = ({ mode, style, labelStyle, children, ...props }: Props) => (
    <PaperButton
        {...props}
        style={[
            styles.button,
            style,
        ]}
        labelStyle={[
            styles.text,
            labelStyle,
        ]}
        theme={{ colors: { ...theme.colors } }}
    >
        {children}
    </PaperButton>
);

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 16
    },
    text: {
        fontFamily: Fonts.ManropeBold,
        fontSize: 14,
        lineHeight: 26
    },
});

export default memo(ButtonCustom);
