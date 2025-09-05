import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Props } from '@core/interfaces/products.interfaces';

import TextInput from '@components/form/TextInput';
import ComboBox from '@components/form/ComboBox';
import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';

export const FormAddress = <T extends Record<any, any>>({ form, errorText, onChange }: Props<T>) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>Aqui puedes modificar o agregar</Text>
            </View>
            <ComboBox
                label={'Departamento'}
                value={form.departamento}
                remote={true} 
                dataUrl={'local/get'}
                objId={'codigoDepto'}
                objLabel={'nombreDepto'}
                onChangeText={(value) => onChange(value, 'departamento')}
                errorText={errorText.departamento}
            />
            <ComboBox
                label={'Ciudad'}
                value={form.ciudad}
                remote={true} 
                dataUrl={`local/get/${form.departamento}`}
                additionalParams={{ department_id: form.departamento }}
                objId={'codigoCiudad'}
                objLabel={'nombreCiudad'}
                onChangeText={(value) => onChange(value, 'ciudad')}
                errorText={errorText.ciudad}
            />
            <ComboBox
                label={'Dirección'}
                value={form.address}
                remote={false}
                dataUrl={''}
                staticData={[
                    { value: "Calle", label: "Calle" },
                    { value: "Carrera", label: "Carrera" },
                    { value: "Avenida", label: "Avenida" },
                    { value: "Diagonal", label: "Diagonal" },
                    { value: "Transversal", label: "Transversal" },
                    { value: "Vía", label: "Vía" },
                    { value: "Vereda", label: "Vereda" },
                    { value: "Autopista", label: "Autopista" }
                ]}
                onChangeText={(value) => onChange(value, 'address')}
                errorText={errorText.address}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput 
                    placeholder={'00'}
                    textColor={theme.colors.custom_blue}
                    contentStyle={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: 18,
                        fontFamily: Fonts.ManropeMedium,
                        width: 86
                    }}
                    value={form.addressNumber}
                    onChangeText={(value) => onChange(value, 'addressNumber')}
                    error={errorText.addressNumber !== ''}
                />
                <Text style={{fontSize: 16, fontFamily: Fonts.DMSansSemiBold, color: theme.colors.custom_blue, marginHorizontal: 10}}>#</Text>
                <TextInput 
                    placeholder={'00'}
                    textColor={theme.colors.custom_blue}
                    contentStyle={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: 18,
                        fontFamily: Fonts.ManropeMedium,
                        width: 86
                    }}
                    value={form.firstNumber}
                    onChangeText={(value) => onChange(value, 'firstNumber')}
                    error={errorText.firstNumber !== ''}
                />
                <Text style={{fontSize: 16, fontFamily: Fonts.DMSansSemiBold, color: theme.colors.custom_blue, marginHorizontal: 10}}>-</Text>
                <TextInput 
                    placeholder={'00'}
                    textColor={theme.colors.custom_blue}
                    contentStyle={{
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: 18,
                        fontFamily: Fonts.ManropeMedium,
                        width: 86
                    }}
                    value={form.secondNumber}
                    onChangeText={(value) => onChange(value, 'secondNumber')}
                    error={errorText.secondNumber !== ''}
                />
            </View>
            <TextInput
                label={'Complemento'}
                placeholder={'(Casa, oficina, etc...)'}
                value={form.complement}
                onChangeText={value => onChange(value, 'complement')}
                error={errorText.complement !== ''}
                errorText={errorText.complement}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});