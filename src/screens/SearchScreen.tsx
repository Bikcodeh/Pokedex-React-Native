import React, { useState } from 'react'
import { Dimensions, FlatList, Platform, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from './../hooks/UsePokemonSearch';
import { styles as globalStyles } from '../theme/AppTheme';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';
import { SimplePokemon } from './../interfaces/pokemonsInterfaces';
import { useEffect } from 'react';

const windowWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, pokemons } = usePokemonSearch();
    const [term, setTerm] = useState('');
    const [pokemonsFiltered, setPokemonsFiltered] = useState<SimplePokemon[]>()

    useEffect(() => {
        if (term.length === 0) {
            return setPokemonsFiltered([]);
        }

        setPokemonsFiltered(
            pokemons.filter(poke => poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
        )

    }, [term]);


    if (isFetching) {
        return <Loading />
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <SearchInput
                onDebounced={(value) => setTerm(value)}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: windowWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 20
                }}
            />
            <View
                style={{
                    alignItems: 'center'
                }}>
                <FlatList
                    data={pokemonsFiltered}
                    keyExtractor={pokemon => pokemon.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (<PokemonCard pokemon={item} />)}

                    ListHeaderComponent={(
                        <Text style={{
                            ...globalStyles.title,
                            ...globalStyles.globalMargin,
                            paddingBottom: 10,
                            marginTop: top + 60
                        }}>{term}</Text>)
                    }
                />
            </View>
        </View>
    )
}
