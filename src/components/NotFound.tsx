import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '@theme';

interface Props {
    text: string;
}

export const NotFound = ({ text }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Icon
                    name="alert-circle-outline"
                    size={100}
                    color={theme.colors.primary}
                />
                <Text style={{
                    color: theme.colors.text,
                    fontSize: 18,
                    textAlign: 'center'
                }}>
                    {text}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30
    },
    row: {
        alignItems: 'center'
    },
});
