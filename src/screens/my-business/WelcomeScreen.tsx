import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import IconIonicon from 'react-native-vector-icons/Ionicons';
import { Provider, Text } from 'react-native-paper';
import uuid from 'react-uuid';
//
import { theme } from '@theme';
import { StackParams } from '@core/navigation';
import { Fonts } from '@core/constants/fontsContans';
import ButtonCustom from '@components/form/ButtonCustom';

// REDUX
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxState } from '@core/interfaces/redux.interfaces';

interface Props extends NativeStackScreenProps<StackParams> {}

export const WelcomeScreen = ({ navigation }: Props) => {

    const { isAuth } = useSelector(({ auth }: ReduxState) => ({
        isAuth: auth.isAuth
    }), shallowEqual);
    
    return (
        <Provider>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    key={uuid()}
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                >
                    <View style={styles.container}>
                        <IconIonicon name="storefront-outline" size={100} color={theme.colors.backdrop} />
                        <Text style={styles.welcomeText}>¡Bienvenid@! ¿Listo para ser parte de MercaBaq?</Text>
                        <ButtonCustom
                            mode={'outlined'}
                            buttonColor={theme.colors.custom_blue}
                            textColor={theme.colors.surface}
                            onPress={() => {
                                // VALIDAR SI ESTA LOGUEADO
                                if (isAuth) {
                                    // IR A LA CREACION
                                    navigation.navigate('createbusiness');
                                } else {
                                    // IR AL LOGIN
                                    navigation.navigate('login');
                                    // navigation.navigate('createbusiness');
                                }
                            }}
                        >
                            Regístrate tu negocio
                        </ButtonCustom>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeText: {
        fontSize: 18,
        fontFamily: Fonts.ManropeMedium,
        color: theme.colors.custom_blue,
        textAlign: 'center',
        marginBottom: 20
    },
});
