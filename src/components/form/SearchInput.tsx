import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import { theme } from '@theme';
import { Fonts } from '@core/constants/fontsContans';

type Props = React.ComponentProps<typeof Searchbar> & {
    onIconPress?: () => void;
    onClearPress?: () => void;
};

const SearchInput = (props: Props) => (
    <Searchbar
        {...props}
        style={[styles.input, props.style]}
        inputStyle={{
            paddingLeft: 0,
            minHeight: 30,
            fontSize: 13,
            fontFamily: Fonts.ManropeMedium
        }}
        placeholderTextColor={theme.colors.custom_grey}
        iconColor={theme.colors.custom_blue}
        theme={{ colors: { ...theme.colors, primary: theme.colors.backdrop } }}
        icon={() => null}
        right={(iconProps) => (
            <View style={styles.iconContainer}>
                {props.value && props.value.length > 0 && (
                    <IconButton
                        {...iconProps}
                        icon="close"
                        style={{
                            backgroundColor: theme.colors.custom_grey,
                            marginHorizontal: 1
                        }}
                        size={18}
                        iconColor={theme.colors.surface}
                        onPress={props.onClearPress}
                    />
                )}
                <IconButton
                    {...iconProps}
                    icon="magnify"
                    style={{
                        backgroundColor: theme.colors.custom_green_dark
                    }}
                    iconColor={theme.colors.custom_blue}
                    onPress={props.onIconPress}
                />
            </View>
        )}
    />
);

const styles = StyleSheet.create({
    input: {
        backgroundColor: theme.colors.background
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default memo(SearchInput);
