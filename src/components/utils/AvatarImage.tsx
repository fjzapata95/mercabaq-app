import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { shallowEqual, useSelector } from 'react-redux';
import { theme } from '@theme';
// 
import { ReduxState } from '@core/interfaces/redux.interfaces';

interface Props {
    size?: number;
}

export const AvatarImage = ({ size = 50 }: Props) => {
    //
    const { user, nameInitials } = useSelector(({ auth }: ReduxState) => ({
        user: auth.user,
        nameInitials: auth.nameInitials,
    }), shallowEqual);
    //
    const [urlImage, setUrlImage] = useState<string | null>(null);

    useEffect(() => {
        // VALIDAR SI EL USUARIO TIENE IMAGEN DE PERFIL.
        if (user.image) {
            // ASIGNAR URL IMAGEN DEL USARIO EN SESION.
            // setUrlImage(`${urlInstance}/storage/usuario/${user.id}/perfil/${user.url_image}`);
        }
    }, [user.image, nameInitials])

    return (
        <View style={styles.avatar}>
            { user.image && urlImage ?
                    <Avatar.Image size={size} source={{ uri: urlImage }} />
                :
                    <Avatar.Text size={size} theme={theme} label={nameInitials} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        marginTop: 6,
        paddingRight: 6
    }
});