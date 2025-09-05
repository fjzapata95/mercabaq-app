import React from 'react';
import { StyleSheet} from 'react-native';
import { Appbar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//
import { theme } from '@theme';
import { StackParams } from '@core/navigation';
import { Fonts } from '@core/constants/fontsContans';

interface Props {
    title: any;
    navigation: any;
    children?: React.ReactNode;
    fromPage?: string;
}

export const AppBar = (props: Props) => {
    return (
        <Appbar.Header style={styles.header} >
            <Appbar.BackAction 
                onPress={() => {
                    // VALIDAR SI HAY UNA PAGINA ESPESIFICA A LA CUAL VOLVER.
                    if (props.fromPage) {
                        // OBTENER PAGINA.
                        const { fromPage } = props;
                        // 
                        props.navigation.navigate(fromPage);
                    } else {
                        //
                        props.navigation.goBack();
                    }
                }} color={theme.colors.surface}
            />
            <Appbar.Content
                {...props}
                titleStyle={{
                    fontSize: 25,
                    fontFamily: Fonts.DMSansBold,
                    color: theme.colors.surface
                }}
                mode={'small'}
                style={{
                    alignItems: 'flex-start',
                }}
            />
            {/** PARA AGREGAR OPCIONES AL BAR */}
            {props.children && (props.children)}
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.colors.custom_blue,
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 1
    }
});
