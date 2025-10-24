import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Caption, Provider, Title } from 'react-native-paper';
import uuid from 'react-uuid';
//
import { theme } from '@theme';
import { StackParams } from '@core/navigation';
import { AvatarImage } from '@components/utils/AvatarImage';
import { InfoText } from '@components/utils/InfoText';
import { SettingItem } from '@components/utils/SettingItem';

// REDUX
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { logout } from '@core/root-store/actions/auth.action';

interface Props extends NativeStackScreenProps<StackParams> {}

export const HomeScreen = ({ navigation }: Props) => {
    // REDUX - DISPACH ACTION.
    const dispatch = useDispatch();

    const { user } = useSelector(({ auth }: ReduxState) => ({
        user: auth.user
    }), shallowEqual);
    
    return (
        <Provider>
            <View style={styles.container}>
                <View style={{...styles.contenCenter, paddingVertical: 10}}>
                    {/* IMAGEN */}
                    <AvatarImage size={120}/>
                    <View style={styles.contenCenter}>
                        <Title style={styles.title}>{user.name}</Title>
                        <Caption style={styles.caption}>{user.email}</Caption>
                    </View>
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView
                        key={uuid()}
                        nestedScrollEnabled
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="handled"
                        contentInsetAdjustmentBehavior="automatic"
                        contentContainerStyle={{ paddingBottom: 0 }}
                        style={{ flex: 1 }}
                    >
                        <InfoText text={'General'} />
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('orders')}
                            >
                                <SettingItem 
                                    text={'Mis Compras'}
                                    icon={'bag-handle-outline'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('addresses')}
                            >
                                <SettingItem 
                                    text={'Mis Direcciones'}
                                    icon={'map-outline'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('pqr')}
                            >
                                <SettingItem 
                                    text={'Ayuda / PQR'}
                                    icon={'help-circle-outline'}
                                />
                            </TouchableOpacity>
                        </View>
                        <InfoText text={'Cuenta'} />
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('profile')}
                            >
                                <SettingItem 
                                    text={'Perfil'}
                                    icon={'person-outline'}
                                />
                            </TouchableOpacity>
                        </View>
                        <InfoText text={'Más'} />
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('aboutus')}
                            >
                                <SettingItem 
                                    text={'Acerda de'}
                                    icon={'bulb-outline'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={privacyPolicyPress}
                            >
                                <SettingItem 
                                    text={'Términos y Políticas'}
                                    icon={'lock-closed-outline'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { dispatch(logout()) }}
                            >
                                <SettingItem 
                                    text={'Cerrar Sesión'}
                                    icon={'exit-outline'}
                                />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    contenCenter: {
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginBottom: 0,
        fontWeight: 'bold',
        color: theme.colors.text,
        textTransform: 'capitalize',
    },
    caption: {
        fontSize: 12,
        lineHeight: 14,
        marginTop: 0,
        color: theme.colors.backdrop
    },
    roleContent: {
        marginTop: 3,
        flexDirection: 'row'
    },
    roleChip: {
        height: 26,
        alignItems: 'center',
        marginHorizontal: 1,
        backgroundColor: theme.colors.primary
    },
    roleText: {
        marginTop: 0,
        textTransform: 'capitalize',
        color: theme.colors.surface
    }
});
