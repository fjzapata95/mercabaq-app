import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, IconButton, List, Modal, Portal, Text } from 'react-native-paper';
import { theme } from '@core/theme';
import { Fonts } from '@core/constants/fontsContans';

interface Props {
    visible: boolean;
    handleToggleSort: (value: boolean) => void;
}

export const SortCatalog = ({ visible, handleToggleSort }: Props) => {
  
    return (
        <Portal theme={theme}>
            <Modal visible={visible} onDismiss={() => handleToggleSort(false)} contentContainerStyle={styles.modal}>
                <View>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Ordenar por:</Text>
                        <IconButton icon="close" onPress={() => handleToggleSort(false)} />
                    </View>

                    <Divider style={styles.divider} />

                    {/* Options with List.Item */}
                    <List.Item
                        title={'Menor Precio'}
                        titleStyle={styles.itemText}
                        onPress={() => console.log('Menor precio')}
                        style={styles.option}
                    />
                    <Divider style={styles.divider} />
                    <List.Item
                        title={'Mayor precio'}
                        titleStyle={styles.itemText}
                        onPress={() => console.log('Mayor precio')}
                        style={styles.option}
                    />
                    <Divider style={styles.divider} />
                    <List.Item
                        title={'Recomendados'}
                        titleStyle={styles.itemText}
                        onPress={() => console.log('Recomendados')}
                        style={styles.option}
                    />
                    <Divider style={styles.divider} />
                    <List.Item
                        title={'Mejor valorados'}
                        titleStyle={styles.itemText}
                        onPress={() => console.log('Mejor valorados')}
                        style={styles.option}
                    />
                    <Divider style={styles.divider} />
                </View>
            </Modal>
        </Portal>
    );
};
  
const styles = StyleSheet.create({
    modal: {
        backgroundColor: theme.colors.background,
        borderRadius: 4,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.ManropeBold,
        color: theme.colors.custom_green_dark
    },
    divider: {
        marginVertical: 8
    },
    itemText: {
        fontSize: 18,
        fontFamily: Fonts.ManropeMedium,
        color: theme.colors.custom_grey
    },
    option: {
        paddingVertical: 2
    }
});