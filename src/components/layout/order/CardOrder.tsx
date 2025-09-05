import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';
import { StackParams } from '@core/navigation';
import { Order } from '@core/interfaces/order.interfaces';

import ButtonCustom from '@components/form/ButtonCustom';
import { formatPrice } from '@core/utils/format';
import moment from 'moment';

interface Props {
    order: Order;
    navigation: NativeStackNavigationProp<StackParams, any, undefined>
}

export const CardOrder = ({ order, navigation }: Props) => {
    
    return (
        <Card style={styles.card}>
            <Card.Content style={styles.content}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                    <View>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: Fonts.ManropeRegular,
                            color: theme.colors.custom_grey,
                            marginBottom: 4
                        }} numberOfLines={1}>
                            N° {order.id}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: Fonts.ManropeRegular,
                            color: theme.colors.custom_grey,
                            marginBottom: 4
                        }} numberOfLines={1}>
                            {order.UserModel.name}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: Fonts.ManropeRegular,
                            color: theme.colors.custom_grey,
                            marginBottom: 4
                        }} numberOfLines={1}>
                            { moment(order.fecha).format('DD MMMM YYYY')}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: Fonts.ManropeRegular,
                            color: theme.colors.custom_grey,
                            marginBottom: 4
                        }} numberOfLines={1}>
                            Pago: {order.estadoPago}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: Fonts.ManropeRegular,
                            color: theme.colors.custom_grey,
                            marginBottom: 4
                        }} numberOfLines={1}>
                            {formatPrice(order.montoTotal)}
                        </Text>
                    </View>
                    <View style={{alignSelf: 'center'}} >
                        <Chip
                            style={[
                                styles.chip,
                                order.estado === "ENTREGADO"
                                    ? styles.completeChip
                                    : styles.pendingChip,
                            ]}
                            textStyle={styles.chipText}
                        >
                            {order.estado}
                        </Chip>
                    </View>
                </View>
            </Card.Content>
            <Card.Actions style={{marginHorizontal: 6, padding: 2}}>
                <ButtonCustom
                    mode={'outlined'}
                    style={{
                        borderRadius: 10,
                        borderColor: theme.colors.custom_green_dark,
                    }}
                    contentStyle={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: theme.colors.custom_green_dark
                    }}
                    labelStyle={{
                        fontSize: 14,
                        fontFamily: Fonts.ManropeMedium
                    }}
                    textColor={theme.colors.custom_green_dark}
                    onPress={() => navigation.navigate('orderdetail', { id: order.id, order: order })}
                >
                    Ver detalle
                </ButtonCustom>
            </Card.Actions>
        </Card>
    );
};
  
const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        backgroundColor: theme.colors.background,
        marginHorizontal: 6,
        marginVertical: 8,
        overflow: 'hidden'
    },
    content: {
        paddingTop: 8,
        paddingHorizontal: 12
    },
    chip: {
        borderRadius: 16
    },
    completeChip: {
        backgroundColor: "#4CAF50",
    },
    pendingChip: {
        backgroundColor: "#FFE136",
    },
    chipText: {
        color: theme.colors.surface,
        fontFamily: Fonts.InterMedium,
        fontSize: 12
    }
});