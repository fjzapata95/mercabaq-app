import { theme } from '@theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    text: string,
    icon: string,
    right?: ((props: {
        color: string;
        style?: Style;
    }) => React.ReactNode) | undefined
}

export const SettingItem = ({ text, icon, right }: Props) => (
    <List.Item
        title={text}
        left={ (props) =>
            <Icon
                {...props}
                name={icon}
                color={theme.colors.backdrop}
                size={26}
            />
        }
        right={right ? right : (iconProps) => <Icon {...iconProps} name={'chevron-forward-outline'} size={20} />}
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
});