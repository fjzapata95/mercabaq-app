import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import ButtonCustom from '@components/form/ButtonCustom';
import { Product } from '@core/interfaces/products.interfaces';

interface Props {
    item: Product
}

export const SellerInfo = ({ item }: Props) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                <Avatar.Icon
                    size={70}
                    icon="account-circle"
                    style={styles.avatar}
                    color="#D3D3D3"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Distribuido por</Text>
                    <Text style={styles.sellerName} numberOfLines={2}>{item.vendedor}</Text>
                    <View style={styles.verifiedContainer}>
                        <Text style={styles.verifiedText}>Verificado</Text>
                        <Image source={require("@assets/icons/check-verified.png")} style={{width: 24, height: 24}} />
                    </View>
                </View>
            </View>
            {/*<ButtonCustom
                mode={'outlined'}
                style={styles.button}
                contentStyle={{
                    padding: 4,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: theme.colors.custom_green_dark
                }}
                labelStyle={{
                    fontSize: 18
                }}
                textColor={theme.colors.custom_green_dark}
                onPress={() => console.log('Visitar vendedor')}
            >
                Visitar vendedor
            </ButtonCustom>*/ }
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        padding: 12,
        margin: 12
    },
    avatar: {
        backgroundColor: '#D3D3D3'
    },
    textContainer: {
        marginLeft: 14,
        paddingVertical: 4
    },
    label: {
        fontSize: 16,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue,
    },
    sellerName: {
        fontSize: 18,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_green_dark,
    },
    verifiedContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    verifiedText: {
        fontSize: 16,
        fontFamily: Fonts.DMSansRegular,
        color: theme.colors.custom_blue,
        marginRight: 2
    },
    button: {
        borderRadius: 10,
        borderColor: theme.colors.custom_green_dark
    }
});