import React from 'react';
import { theme } from '@theme';
import { View, StyleSheet } from 'react-native';
import { Caption, Title } from 'react-native-paper';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { AvatarImage } from '@components/utils/AvatarImage';


export const UserInfo = () => {
    //
    const { user } = useSelector(({ auth }: ReduxState) => ({ user: auth.user }), shallowEqual);
    
    return (
        <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <AvatarImage size={50}/>
                <View style={{ marginLeft: 6, maxWidth: 180 }}>
                    <Title numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{user.name}</Title>
                    <Caption numberOfLines={1} ellipsizeMode="tail" style={styles.caption}>{user.email}</Caption>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 2,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: theme.colors.backdrop
    }
});