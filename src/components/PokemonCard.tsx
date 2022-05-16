import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SimplePokemon } from './../interfaces/pokemonsInterfaces';
import { FadeInImage } from './FadeInImage';
import { getImageColor } from './../helpers/getColor';
import { useRef } from 'react';

interface Props {
    pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width

export const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setBgColor] = useState<string>('grey');
    const isMounted = useRef(true);

    const getBgColor = async(uri: string) => {
        const color = await getImageColor(uri);
        setBgColor(color || 'grey');
    }

    useEffect(() => {
      //IOS background
      //Android: dominant
      if(!isMounted.current) return;
      getBgColor(pokemon.picture)
      return () => {
          isMounted.current = false;
      }
    }, [])
    

    return (
        <TouchableOpacity
            activeOpacity={0.9}
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}>
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>
                <View style={styles.pokebolaContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>

                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -25,
        right: -25
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -5,
        bottom: -8
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
})
