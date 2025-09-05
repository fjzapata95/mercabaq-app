import { theme } from '@theme';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';

type Props = {
    visible: boolean
}

const ProgressDialog = ({ visible }: Props) => {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
        >
            <View style={styles.wrapper}>
                <View style={styles.content}>
                    <ActivityIndicator size="large" color={theme.colors.surface}/>
                    <Text style={styles.label}>Espere por favor...</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    label: {
        color: theme.colors.surface,
        fontSize: 18,
        fontWeight: '600',
        textAlignVertical: 'center',
        marginLeft: 15
    },
    content: {
        flexDirection: 'row',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
})

export default ProgressDialog