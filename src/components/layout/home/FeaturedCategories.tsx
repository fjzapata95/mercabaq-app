import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';
import { theme } from '@core/theme';
import uuid from 'react-uuid';

import { Fonts } from '@core/constants/fontsContans';
import { CardCategory } from '@components/card/CardCategory';
import { StackParams } from '@core/navigation';

import { Category, CategoryResponse } from '@core/interfaces/caregory.interfaces';
import apiHelpers from '@core/auth/apiHelpers';
import { LoandingPage } from '@components/LoandingPage';
import { NotFound } from '@components/NotFound';

interface Props extends NativeStackScreenProps<StackParams> {}

export const FeaturedCategories = ({ navigation }: Props) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * OBTENER LISTADO DE CATEGORÍAS
     */
    const loadCategories = async () => {
        // LOANDING
        setLoading(true);
        try {
            const { data: { data, error } } = await apiHelpers.get<CategoryResponse>('categoria/get');
            // VALOR POR DEFECTO
            let result: Category[] = [];
            // VALIDAR SI SE OBTUVIERON DATOS
            if (!error) result = data.filter((obj: any) => obj.status);;
            // ASIGNAR DATOS
            setCategories(result);
            setLoading(false);
        } catch (error) {
            setCategories([]);
            setLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <View style={{marginHorizontal: 16, marginBottom: 10}}>
            <Text variant="titleLarge" style={styles.title}>
                Categorías destacadas
            </Text>
            <ScrollView
                key={uuid()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {categories.map((category) => (
                    <Pressable key={category.title}>
                        <CardCategory category={category} navigation={navigation} />
                    </Pressable>
                ))}
            </ScrollView>
            {/**
             * LOANING
            */}
            {loading && (
                <LoandingPage size={30} color={theme.colors.primary} text={'Cargando Categorías...'} textStyle={{color: theme.colors.custom_blue}} />
            )}
            {/**
             * NOTFOUNT
            */}
            {!loading && Object.keys(categories).length == 0 && (
                <NotFound text={'No se encontraron categorías'} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: Fonts.DMSansBold,
        color: theme.colors.custom_blue,
        paddingVertical: 20
    },
    scrollContent: {
        paddingHorizontal: 0
    }
});
