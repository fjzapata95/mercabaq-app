import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Drawer } from 'react-native-paper';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { theme } from '@theme';
import { logout } from '@rootStore/actions/auth.action';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserInfo } from './drawer/UserInfo';

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    {/** USER INFO */}
                    <UserInfo />

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            // icon={({ color, size }) => (
                            //     <Icon
                            //         name="reader-outline"
                            //         color={color}
                            //         size={size}
                            //     />
                            // )}
                            label={'Home'}
                            onPress={() => { navigation.navigate('home') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-outline"
                            color={color}
                            size={size}
                        />
                    )}
                    label={'Cerrar Sesión'}
                    onPress={() => { dispatch(logout()) }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
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
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 2,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
});

export default DrawerContent;