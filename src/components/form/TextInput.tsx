import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '@theme';
import { Fonts } from '@core/constants/fontsContans';

type Props = React.ComponentProps<typeof Input> & { errorText?: string } & {
    fixRight?: { icon: string; onPress: Function } | null;
};

const TextInput = ({ errorText, style, outlineStyle, fixRight, ...props }: Props) => (
    <View style={styles.container}>
        <Input
            style={[
                styles.input,
                style,
            ]}
            outlineStyle={[
                { borderRadius: 10 },
                outlineStyle,
            ]}
            selectionColor={theme.colors.primary}
            activeUnderlineColor={theme.colors.backdrop}
            underlineColor={theme.colors.backdrop}
            mode="outlined"
            theme={{ colors: { ...theme.colors, primary: theme.colors.backdrop } }}
            {...props}
        />
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        marginVertical: 6
    },
    input: {
        fontSize: 16,
        fontFamily: Fonts.DMSansSemiBold,
        backgroundColor: theme.colors.surface
    },
    error: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4
    },
});

export default memo(TextInput);
