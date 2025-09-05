import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import ButtonCustom from '@components/form/ButtonCustom';


export const ProductOptions = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Opciones:</Text>
            <View style={styles.containerOptions}>
                <FlatList
                    data={['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5']}
                    keyExtractor={(item, index) => `option_${item}-${index}`}
                    renderItem={(props: any) => 
                        <View {...props} style={{marginHorizontal: 4, marginVertical: 2}}>
                            <ButtonCustom
                                mode={'outlined'}
                                style={styles.button}
                                contentStyle={{
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: theme.colors.custom_green_dark
                                }}
                                labelStyle={{
                                    fontSize: 18
                                }}
                                textColor={theme.colors.custom_green_dark}
                            >
                                {props.item}
                            </ButtonCustom>
                        </View>
                    }
                    numColumns={3}
                    style={{
                        backgroundColor: theme.colors.background
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        marginVertical: 8
    },
    containerOptions: {
    },
    text: {
        fontSize: 20,
        fontFamily: Fonts.DMSansSemiBold,
        color: theme.colors.custom_blue,
        marginVertical: 4
    },
    button: {
        borderRadius: 10,
        marginVertical: 2,
        borderColor: theme.colors.custom_green_dark
    }
});