import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@core/constants/fontsContans';
import { Product } from '@core/interfaces/products.interfaces';

interface Props {
    item: Product
}

export const ProductOverview = ({ item }: Props) => {
    // Renderiza cada fila
    // const renderItem = ({ item }: { item: { name: string; description: string } }) => (
    //     <View style={styles.row}>
    //         <Text style={styles.name}>{item.name}</Text>
    //         <Text style={styles.description}>{item.description}</Text>
    //     </View>
    // );

    return (
        <View style={styles.container}>
            <View style={styles.containerDesc}>
                <Text style={styles.descTitle}>Descripción del producto</Text>
                <Text style={styles.descInfo}>{item.descripcion}</Text>
            </View>
            {/*<View style={styles.containerAdd}>
                <Text style={styles.descTitle}>Información Adicional</Text>
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Divider />}
                />
            </View>*/}
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        marginVertical: 8,
        padding: 10
    },
    containerDesc: {
        marginVertical: 10
    },
    descTitle: {
        fontSize: 18,
        fontFamily: Fonts.DMSansSemiBold,
        marginBottom: 10
    },
    descInfo: {
        fontSize: 14,
        fontFamily: Fonts.ManropeRegular,
        color: '#838383',
        marginTop: 10
    },
    containerAdd: {
        marginVertical: 10
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    name: {
        fontSize: 14,
        fontFamily: Fonts.ManropeRegular,
        color: '#838383'
    },
    description: {
        fontSize: 14,
        fontFamily: Fonts.ManropeRegular,
        color: '#838383'
    }
});