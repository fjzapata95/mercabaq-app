import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';
import { theme } from '@core/theme';

import { Fonts } from '@core/constants/fontsContans';
import { CardCategory } from '@components/card/CardCategory';
import { StackParams } from '@core/navigation';

import { Category, CategoryResponse } from '@core/interfaces/caregory.interfaces';
import apiHelpers from '@core/auth/apiHelpers';
import { LoandingPage } from '@components/LoandingPage';
import { NotFound } from '@components/NotFound';

const CATEGORIES = [
    {
        id: 1,
        title: "Frutas y Verduras",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Carnes",
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "Lácteos y Huevos",
        image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Panadería",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        title: "Abarrotes",
        image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=500&q=80"
    }
];

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
            if (!error) result = data;
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
