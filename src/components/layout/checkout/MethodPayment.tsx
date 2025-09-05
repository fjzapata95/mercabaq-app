import React from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '@core/theme';
import TextInput from '@components/form/TextInput';
import ButtonCustom from '@components/form/ButtonCustom';
import { Props } from '@core/interfaces/checkout.interfaces';
import CheckboxInput from '@components/form/CheckboxInput';
import { Fonts } from '@core/constants/fontsContans';

export const MethodPayment = <T extends Record<string, string>>({ data, onChangeText, next }: Props<T>) => {

    const handlePress = (value: any) => {

        next(value);
    }

    return (
        <View style={styles.container}>
            
            <CheckboxInput isChecked={false} style={{
                color: theme.colors.custom_grey,
                fontFamily: Fonts.ManropeMedium,
                fontSize: 16
            }}>
                Guardar mi información de pago
            </CheckboxInput>
            <View style={{marginLeft: 4, paddingHorizontal: 8, alignSelf: 'center'}}>
                <ButtonCustom
                    mode='contained'
                    style={{
                        width: 210,
                        borderRadius: 30,
                    }}
                    buttonColor={theme.colors.custom_blue}
                    textColor={theme.colors.surface}
                    onPress={() => handlePress('confirmation')}
                >
                    Continuar
                </ButtonCustom>
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        // padding: 16
    }
});