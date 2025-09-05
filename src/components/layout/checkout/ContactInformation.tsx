import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '@core/theme';
import TextInput from '@components/form/TextInput';
import ButtonCustom from '@components/form/ButtonCustom';
import { Props } from '@core/interfaces/checkout.interfaces';

// REDUX
import { useDispatch } from 'react-redux';
import { showAlert } from '@core/root-store/actions/util.action';

export const ContactInformation = <T extends Record<string, string>>({ data, onChangeText, next }: Props<T>) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const handlePress = useCallback((value: string) => {
        // VALIDAR SI TIENE UNA DIRECCCION SELECCIONADA
        if (data.nombreReceptor) {
            // SIGUIENTE
            next(value);
        } else {
            // MENSAJE PARA EL CLIENTE
            dispatch(showAlert({show: true, message: 'Por favor, debe digitar el nombre de quien recibe.'}))
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <TextInput 
                label={'¿Quién recibirá el paquete?'}
                placeholder={'Nombre'}
                value={data.nombreReceptor}
                onChangeText={(value) => onChangeText(value, 'nombreReceptor')}
            />
            <TextInput 
                label={'Comentario'}
                placeholder={'Comentario'}
                multiline
                value={data.comentario}
                onChangeText={(value) => onChangeText(value, 'comentario')}
            />
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