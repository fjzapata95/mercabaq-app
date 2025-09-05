import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Caption, Provider, Title, Chip } from 'react-native-paper';
import { useSelector, shallowEqual } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// 
import { theme } from '@theme';
import { StackParams } from '@core/navigation';
import { ReduxState } from '@core/interfaces/redux.interfaces';
import { AppBar } from '@components/AppBar';
import { AvatarImage } from '@components/utils/AvatarImage';
import { InfoText } from '@components/utils/InfoText';
import ProfileItem from '@components/utils/ProfileItem';

interface Props extends NativeStackScreenProps<StackParams> {}

export const ProfileScreen = ({ navigation }: Props) => {

    const { user } = useSelector(({ auth }: ReduxState) => ({
        user: auth.user
    }), shallowEqual);
    
    return (
        <Provider>
            <AppBar
                title={'Perfil'}
                navigation={navigation}
                fromPage={'home'}
                children={
                    <TouchableOpacity
                        style={{
                            padding: 6,
                            marginRight: 6
                        }}
                        onPress={() => navigation.navigate('profileform')}
                    >
                        <Icon name={'create-outline'} size={24} color={theme.colors.surface} />
                    </TouchableOpacity>
                }
            />
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
                        nestedScrollEnabled
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="handled"
                        contentInsetAdjustmentBehavior="automatic"
                        contentContainerStyle={{ paddingBottom: 0 }}
                        style={{ flex: 1 }}
                    >
                        <InfoText text={'Perfil'} />
                        <View>
                            <ProfileItem
                                text={'N/A'}
                                description={'Fecha Nacimiento'}
                                icon={'calendar-outline'}
                            />
                            <ProfileItem
                                text={'N/A'}
                                description={'Teléfono'}
                                icon={'call-outline'}
                            />
                            <ProfileItem
                                text={'N/A'}
                                description={'Celular'}
                                icon={'phone-portrait-outline'}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Provider>
    );
}


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
        color: theme.colors.text
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