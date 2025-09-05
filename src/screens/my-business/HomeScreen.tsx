import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Caption, List, Text, Title } from 'react-native-paper';
//
import { theme } from '@theme';
import { AvatarImage } from '@components/utils/AvatarImage';
import { StackParams } from '@core/navigation';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { Fonts } from '@core/constants/fontsContans';
import { Style } from '@core/styles';

// COMPONENTS
import { SellerInfo } from '@components/layout/my-business/SellerInfo';
// import { PendingOrders } from '@components/layout/my-business/PendingOrders';

interface Props extends NativeStackScreenProps<StackParams> {}

export const HomeScreen = (props: Props) => {
    //
    const { user, business } = useSelector(({ auth }: ReduxState) => ({
        user: auth.user,
        business: auth.business
    }), shallowEqual);
    
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                >
                    <View style={styles.userInfoSection}>
                        <View style={{ marginTop: 10, alignItems: 'center' }}>
                            <AvatarImage size={130}/>
                            <View>
                                <Title numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{user.name}</Title>
                                <Caption numberOfLines={1} ellipsizeMode="tail" style={styles.caption}>{user.email}</Caption>
                            </View>
                            <View style={styles.verifiedContainer}>
                                {business && business.estado ? (
                                    <View style={styles.verifiedContainer}>
                                        <Text style={styles.verifiedText}>Verificado</Text>
                                        <Image source={require("@assets/icons/check-verified.png")} style={{width: 24, height: 24}} />
                                    </View>
                                ) : (
                                    <Text style={styles.verifiedText}>No Verificado</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.card}>
                            <List.Item
                                title="Cumpleaños"
                                titleStyle={styles.cartTitle}
                                description="Aug 20, 1997"
                                descriptionStyle={styles.cartDescription}
                                left={(props) => <List.Icon {...props} icon="gift-outline" color={theme.colors.custom_green_dark} style={{...props.style, borderWidth: 1, borderColor: theme.colors.custom_green_dark, borderRadius: 6, padding: 6}} />}
                                style={styles.cardItem}
                            />
                            <List.Item
                                title="Cargo"
                                titleStyle={styles.cartTitle}
                                description="Vendedor"
                                descriptionStyle={styles.cartDescription}
                                left={(props) => <List.Icon {...props} icon="tag-outline" color={theme.colors.custom_green_dark} style={{...props.style, borderWidth: 1, borderColor: theme.colors.custom_green_dark, borderRadius: 6, padding: 6}} />}
                                style={styles.cardItem}
                            />
                        </View>
                    </View>
                    <View style={styles.container}>
                        {/** INDICADORES DEL VENDEDOR */}
                        <SellerInfo />
                        {/** PEDIDOS PENDIENTES */}
                        {/** <PendingOrders /> */}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userInfoSection: {
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 14,
        backgroundColor: theme.colors.background,
        ...Style.shadowStyle
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 10,
        backgroundColor: theme.colors.background
    },
    cardItem: {
        marginHorizontal: 20,
        marginVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.custom_grey
    },
    cartTitle: {
        fontSize: 16,
        fontFamily: Fonts.InterMedium,
        color: '#2E2E2E'
    },
    cartDescription: {
        fontSize: 14,
        fontFamily: Fonts.InterRegular,
        color: '#71747D'
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.InterMedium,
        color: theme.colors.custom_blue,
        textAlign: 'center'
    },
    caption: {
        fontSize: 14,
        fontFamily: Fonts.InterMedium,
        lineHeight: 14,
        color: theme.colors.custom_grey
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
});
