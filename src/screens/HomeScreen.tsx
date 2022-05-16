import React from 'react'
import { Image, FlatList, Text, ActivityIndicator, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './../theme/AppTheme';
import { usePokemonPaginated } from './../hooks/UsePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';

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

            <View style={{
                alignItems: 'center'
            }}>
                <FlatList
                    data={pokemons}
                    keyExtractor={pokemon => pokemon.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (<PokemonCard pokemon={item} />)}

                    //Infinite scroll
                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4}

                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 10
                        }}>Pokedex</Text>)
                    }
                    ListFooterComponent={(
                        <ActivityIndicator style={{ height: 100 }} color="grey" size={20} />
                    )}
                />
            </View>

        </>
    )
}