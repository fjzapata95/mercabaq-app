import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import IconFeather from 'react-native-vector-icons/Feather';
import { Provider, Text } from 'react-native-paper';
//
import { theme } from '@theme';
import { StackParams } from '@core/navigation';

interface Props extends NativeStackScreenProps<StackParams> {}

export const CategoriesScreen = (props: Props) => {
    return (
        <Provider>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                >
                    <View style={styles.container}>
                        <IconFeather name="user" size={100} color={theme.colors.backdrop} />
                        <Text style={{color: theme.colors.backdrop, fontSize: 18}}>Home</Text>
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
    }
});
