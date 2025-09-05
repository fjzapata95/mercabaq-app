import { theme } from '@theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    text: string,
    description: string,
    icon: string
}

const ProfileItem = ({ text, description, icon }: Props) => (
    <List.Item
        title={text}
        description={description}
        left={ (props) =>
            <Icon
                {...props}
                name={icon}
                color={theme.colors.backdrop}
                size={26}
            />
        }
        theme={theme}
    />
)

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 12,
        backgroundColor: '#F4F5F4',
    },
    infoText: {
        fontSize: 16,
        marginLeft: 20,
        color: 'gray',
        fontWeight: '500',
    },
})

export default ProfileItem