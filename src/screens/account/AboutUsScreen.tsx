import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, Provider, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '@core/navigation';
import { theme } from '@theme';
import { LogoAlcaldia } from '@components/svg/LogoAlcaldia';
import { AppBar } from '@components/AppBar';

import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

interface Props extends NativeStackScreenProps<StackParams> {}

export const AboutUsScreen = ({ navigation }: Props) => {    
    return (
        <Provider>
            <AppBar 
                title={'Acerca de'}
                navigation={navigation}
                fromPage={'home'}
            />
            <View style={styles.container}>
                <View style={styles.contentImage}>
                    <LogoAlcaldia width="100%" height="100%" fill={theme.colors.custom_blue} />
                </View>
                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <Text style={{color: theme.colors.text}}>{'Versión'} {DeviceInfo.getVersion()}</Text>
                    <Text style={{color: theme.colors.text}}>Copyright © MercaBaq {moment().year()}</Text>
                </View>
                {/* ITEMS */}
                <View style={{alignItems: 'center', marginTop: 20}}>
                    <Menu.Item
                        // onPress={}
                        title={'Manual de Usuario'}
                        titleStyle={{
                            color: theme.colors.custom_blue,
                            alignSelf: 'center'
                        }}
                        style={{
                            height: 30
                        }}
                    />
                    <Menu.Item
                        // onPress={}
                        title={'Soporte'}
                        titleStyle={{
                            color: theme.colors.custom_blue,
                            alignSelf: 'center'
                        }}
                        style={{
                            height: 30
                        }}
                    />
                </View>
            </View>
        </Provider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentImage: {
        width: 210,
        height: 160,
        resizeMode: 'stretch',
    }
});