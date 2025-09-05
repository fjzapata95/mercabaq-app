import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { List, Provider } from 'react-native-paper';
import { StackParams } from '@core/navigation';
import apiHelpers from '@core/auth/apiHelpers';
import { AppBar } from '@components/AppBar';
import { theme } from '@theme';

//
import ButtonCustom from '@components/form/ButtonCustom';
import { NotFound } from '@components/NotFound';
import { LoandingPage } from '@components/LoandingPage';
import { PQR, PQRResponse } from '@core/interfaces/pqr.interfaces';

interface Props extends NativeStackScreenProps<StackParams> {}

export const PqrScreen = ({ navigation }: Props) => {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [data, setData] = useState<PQR[]>([]);

    /**
     * OBTENER LISTADO DE PQR
     */
    const loadPqr = async () => {
        // LOANDING
        if (!isFetching) setLoading(true);
        try {
            // 
            const { data: { data, error } } = await apiHelpers.get<PQRResponse>(`pqr/get`);
            // VALIDAR SI SE OBTUVO DATOS
            if (!error) {
                // ASIGNAR DATOS
                setData(data);
            } else {
                // ASIGNAR DATOS
                setData([]);
            }
            setLoading(false);
            setIsFetching(false);
        } catch (error) {
            setData([]);
            setLoading(false);
            setIsFetching(false);
        }
    }

    /**
     * 
     */
    const onRefresh = () => {
        setIsFetching(true);
        // ASIGNAR NUEVA PAGINA AL FILTRO.
        loadPqr();
    };
        
    /**
     * RENDER ORDER
     * @param param0 
     * @returns 
     */
    const renderItem = ({ item }: { item: PQR }) => (
        <View style={styles.addressesContainer}>
            <List.Item
                title={item.descripcion}
                description={`${item.fechaCreacion}`}
            />
        </View>
    );
    
    /**
     * 
     */
    useEffect(() => {
        loadPqr();
    }, []);

    return (
        <Provider>
            <AppBar 
                title={'Ayuda / PQR'}
                navigation={navigation}
                fromPage={'home'}
            />
            <View style={styles.container}>
                <View style={{marginHorizontal: 10}}>
                    <ButtonCustom
                        mode={'outlined'}
                        buttonColor={theme.colors.custom_blue}
                        textColor={theme.colors.surface}
                        onPress={() => navigation.navigate('createpqr')}
                    >
                        Crear PQR
                    </ButtonCustom>
                </View>

                <View style={[styles.container, {marginTop: 10, marginHorizontal: 8}]}>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => `pqr_account_${item.id}-${index}`}
                        renderItem={renderItem}
                        style={{
                            backgroundColor: theme.colors.background
                        }}
                        showsVerticalScrollIndicator={false}
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                        ListEmptyComponent={() => <NotFound text={'No se encontraron datos'} />}
                    />
                    {/* CONTENEDEDOR - LOANDING */}
                    {loading && (
                        <LoandingPage
                            size={100}
                            color={theme.colors.primary}
                            background={theme.colors.background}
                        />
                    )}
                </View>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    addressesContainer: {
        flex: 1
    },
    button: {
        padding: 6,
        borderRadius: 50
    },
});
