import React from 'react'
import { Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './../theme/AppTheme';
import { usePokemonPaginated } from './../hooks/UsePokemonPaginated';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, pokemons } = usePokemonPaginated();
    console.log(pokemons);
    return (
        <>
            <Image
                source={require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />
            <Text style = {{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20
            }}>
                Pokedex
            </Text>
        </>
    )
}