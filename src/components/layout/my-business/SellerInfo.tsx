import apiHelpers from '@core/auth/apiHelpers';
import { Fonts } from '@core/constants/fontsContans';
import { theme } from '@core/theme';
import { formatPrice } from '@core/utils/format';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';

interface Detail {
    vendedor: any;
    mes: any;
    anio: any;
    totalVentas: any;
    totalPedidos: any;
}

export const SellerInfo = () => {

    const [detail, setDetail] = useState<Detail>({
        vendedor: 0,
		mes: 0,
		anio: 0,
		totalVentas: 0,
		totalPedidos: 0
    });
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * OBTENER DETALLE DEL PEDIDO
     */
    const loadDetail = useCallback(async () => {
        // LOANDING
        setLoading(true);
        try {
            const { data: { data, error } } = await apiHelpers.get<any>(`reportes/ventas`, {
                params: {
                    mes: moment().month() + 1,
                    anio: moment().year()
                }
            });
            // VALIDAR SI SE OBTUVO DATOS
            if (!error) {
                // ASIGNAR DATOS
                setDetail(data);
            } else {
                // ASIGNAR DATOS
                setDetail({
                    vendedor: 0,
                    mes: 0,
                    anio: 0,
                    totalVentas: 0,
                    totalPedidos: 0
                });
            }
            setLoading(false);
        } catch ({error}: any) {
            setDetail({
                vendedor: 0,
                mes: 0,
                anio: 0,
                totalVentas: 0,
                totalPedidos: 0
            });
            setLoading(false);
            console.error(error);
        }
    }, []);
        
    /**
     * 
     */
    useEffect(() => { loadDetail(); }, []);


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <List.Item
                    title="Ventas del mes"
                    titleStyle={styles.cardTitle}
                    descriptionStyle={styles.cardDescription}
                    left={(props) => <List.Icon {...props} icon="cash-multiple" color={theme.colors.custom_green_dark} style={[props.style, styles.cardIcon]} />}
                    right={(props) => <Text {...props} style={[props.style, styles.cardDescription]}>{formatPrice(detail.totalVentas)}</Text>}
                    style={styles.cardItem}
                />
                <List.Item
                    title="Alertas de inventarios"
                    titleStyle={styles.cardTitle}
                    left={(props) => <List.Icon {...props} icon="alert-circle-outline" color={theme.colors.custom_green_dark} style={[props.style, styles.cardIcon]} />}
                    right={(props) => <Text {...props} style={[props.style, styles.cardDescription]}>Ninguna</Text>}
                    style={styles.cardItem}
                />
                <List.Item
                    title="Pedidos del mes"
                    titleStyle={styles.cardTitle}
                    descriptionStyle={styles.cardDescription}
                    left={(props) => <List.Icon {...props} icon="package-variant-closed" color={theme.colors.custom_green_dark} style={[props.style, styles.cardIcon]} />}
                    right={(props) => <Text {...props} style={[props.style, styles.cardDescription]}>{detail.totalPedidos}</Text>}
                    style={styles.cardItem}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: theme.colors.background,
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    cardItem: {
        marginVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.custom_grey
    },
    cardIcon: {
        borderWidth: 1,
        borderColor: theme.colors.custom_green_dark,
        borderRadius: 6,
        padding: 6
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: Fonts.ManropeBold,
        color: '#142334'
    },
    cardDescription: {
        fontSize: 18,
        fontFamily: Fonts.ManropeMedium,
        color: '#142334'
    }
});
