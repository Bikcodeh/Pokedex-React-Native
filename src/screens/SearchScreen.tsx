import React from 'react'
import {  Dimensions, FlatList, Platform, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from './../hooks/UsePokemonSearch';
import { styles as globalStyles } from '../theme/AppTheme';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';

const windowWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, pokemons } = usePokemonSearch();

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
                    data={pokemons}
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
                        }}>Pokedex</Text>)
                    }
                />
            </View>
        </View>
    )
}
