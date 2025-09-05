import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import InputDate, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { TouchableRipple, Text } from 'react-native-paper';
import TextInput from '@components/form/TextInput';
import moment from 'moment';
import { theme } from '@theme';

type Props = {
    type: 'date' | 'time' | 'datetime',
    label: string,
    value: any,
    format: 'YYYY-MM-DD' | 'HH:mm:ss' | 'YYYY-MM-DD HH:mm:ss',
    onChangeText: (value: any) => void;
}

interface DateState {
    date: any;
    open: boolean;
}

const DateTimePicker = (props: Props) => {
    // 
    const [dateRange, setDateRange] = useState<DateState>({
        date: '',
        open: false
    });
    /**
     * 
     * @param props 
     * @returns 
     */
    const renderTouchText = (props: any) => {
        const { style, value } = props;
        return (
            <TouchableRipple style={styles.touchText} onPress={() => showMode()}>
                <Text style={{...style, fontSize: 16, color: theme.colors.text}}>{value}</Text>
            </TouchableRipple>
        );
    };
    /**
     * 
     */
    const handleOpen = () => {
        setDateRange({
            ...dateRange,
            open: true
        });
    };
    /**
     * 
     * @param event 
     * @param date 
     */
    const onChange = (event: any, date: any) => {
        // TIPO DE EVENTO.
        if (event.type === 'set') {
            // setDate(currentDate);
            setDateRange({ ...dateRange, date, open: false });
            // DISPARAR EVENTO CHANGE.
            props.onChangeText(moment(date, [props.format]).format(props.format));
        }
    };
    /**
     * 
     */
    const showMode = () => {
        /**
         * SOLO SE UTILIZA EN SISTEMA IOS.
         */
        if (Platform.OS === 'ios') handleOpen();
        /**
         * SOLO SE UTILIZA EN SISTEMA ANDROID.
         */
        if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
                value: dateRange.date || new Date(),
                onChange,
                mode: props.type as any,
                is24Hour: true
            });
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.content_input}>
                    <TextInput
                        label={props.label}
                        returnKeyType="next"
                        value={props.value}
                        render={(props) => renderTouchText(props)}
                        mode="outlined"
                        placeholder={props.format}
                        theme={{ colors: { ...theme.colors, primary: theme.colors.backdrop } }}
                    />
                </View>
                {dateRange.open && (
                    <InputDate
                        value={dateRange.date || new Date()}
                        mode={(props.type as any)}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    content_input: {
        borderRadius: 10
    },
    input: {
        borderRadius: 10
    },
    touchText: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        color: theme.colors.text
    }
});

export default memo(DateTimePicker);
