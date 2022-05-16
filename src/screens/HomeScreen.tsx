import React from 'react'
import { Image, FlatList, Text, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './../theme/AppTheme';
import { usePokemonPaginated } from './../hooks/UsePokemonPaginated';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, pokemons, loadPokemons } = usePokemonPaginated();
    console.log(pokemons);
    return (
        <>
            <Image
                source={require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />

            <FlatList
                data={pokemons}
                keyExtractor={pokemon => pokemon.id}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.picture }}
                        style={{
                            width: 100,
                            height: 100
                        }}
                    />
                )}
                showsVerticalScrollIndicator = { false }
                //Infinite scroll
                onEndReached={loadPokemons}
                onEndReachedThreshold={0.4}
                ListFooterComponent={(
                    <ActivityIndicator style={{ height: 100 }} color="grey" size={20} />
                )}
            />

            {/* <Text style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20
            }}>
                Pokedex
            </Text> */}
        </>
    )
}