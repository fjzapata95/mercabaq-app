import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Props } from '@core/interfaces/products.interfaces';

import TextInput from '@components/form/TextInput';
import ComboBox from '@components/form/ComboBox';

export const FormProduct = <T extends Record<any, any>>({ form, errorText, onChange }: Props<T>) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>Aqui puedes modificar el contenido de tu producto</Text>
            </View>
            <TextInput
                label={'Nombre de producto'}
                placeholder={'Nombre producto'}
                value={form.name}
                onChangeText={(value) => onChange(value, 'name')}
                error={errorText.name !== ''}
            />
            <TextInput
                label={'Descripción'}
                placeholder={'Descripción del producto'}
                multiline
                value={form.descripcion}
                onChangeText={(value) => onChange(value, 'descripcion')}
                error={errorText.descripcion !== ''}
            />
            <ComboBox
                label={'Categoría'}
                value={form.categoria}
                remote={true} 
                dataUrl={'categoria/get'}
                objLabel={'title'}
                onChangeText={(value) => onChange(value, 'categoria')}
                errorText={errorText.categoria}
            />
            <TextInput
                label={'Precio'}
                placeholder={'00.000'}
                keyboardType={'numeric'}
                value={form.price}
                onChangeText={(value) => onChange(value, 'price')}
                error={errorText.price !== ''}
            />
            <ComboBox
                label={'Unidad de venta'}
                value={form.um}
                remote={false}
                dataUrl={''}
                staticData={[
                    { value: "g", label: "Gramos" },
                    { value: "kg", label: "Kilogramos" },
                    { value: "lb", label: "Libras" },
                    { value: "oz", label: "Onzas" },
                    { value: "ml", label: "Mililitros" },
                    { value: "l", label: "Litros" },
                    { value: "m", label: "Metros" },
                    { value: "u", label: "Unidad" },
                    { value: "dz", label: "Docenas" },
                    { value: "manojo", label: "Manojo" },
                    { value: "caja", label: "Caja" },
                    { value: "rollo", label: "Rollo" }
                ]}
                onChangeText={(value) => onChange(value, 'um')}
                errorText={errorText.um}
            />
            <TextInput
                label={'Cantidad Disponible'}
                placeholder={'00'}
                keyboardType={'numeric'}
                value={form.stock}
                onChangeText={(value) => onChange(value, 'stock')}
                error={errorText.price !== ''}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});