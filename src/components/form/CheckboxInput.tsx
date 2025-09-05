import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { theme } from '@theme';

type Props = React.ComponentProps<typeof Text> & {isChecked?: boolean, value?: any, onChangeText?: (value: any) => void;};

const CheckboxInput = ({ isChecked = false, children, style, value, onChangeText }: Props) => {
    
    const [checked, setChecked] = useState(isChecked);

    /**
     * 
     */
    const handlePress = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        // VALIDAR EXISTENCIA
        if (onChangeText) onChangeText(newChecked ? value : '');
    };

    /**
     * 
     */ 
    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    return (
        <View style={styles.container}>
            <Checkbox.Android
                uncheckedColor={theme.colors.custom_green_dark}
                color={theme.colors.custom_green_dark}
                style={{ flex: 1, borderWidth: 0.4 }}
                status={checked ? 'checked' : 'unchecked'}
                onPress={handlePress}
            />
            { children && (
                <Text style={[{ flexDirection: 'row', flexShrink: 1 }, style]}>
                    {children}
                </Text>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default memo(CheckboxInput);
