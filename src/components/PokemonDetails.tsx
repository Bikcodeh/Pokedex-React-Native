import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonsInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonFull
}

export const PokemonDetails = ({ pokemon }: Props) => {

    return (
        <ScrollView
            style={{
                ...StyleSheet.absoluteFillObject,
            }}>

            <View style={{
                ...styles.container,
                marginTop: 370
            }}>
                { /** Types */}
                <Text style={styles.title}>Types</Text>
                <View style={{
                    flexDirection: 'row'
                }}>
                    {
                        pokemon.types.map(({ type }) => (
                            <Text style={styles.regularText} key={type.name}> {type.name} </Text>
                        ))
                    }
                </View>
                { /** Sprites */}
                { /** Weight */}
                <Text style={styles.title}>Weight</Text>
                <Text style={styles.regularText}>{pokemon.weight}lb</Text>
                { /** Weight */}
            </View>
            { /** Sprites */}
            <View style={styles.container}>
                <Text style={styles.title}>
                    Sprites
                </Text>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FadeInImage
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.front_shiny}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_shiny}
                    style={styles.basicSprite}
                />
            </ScrollView>
            { /** Sprites */}
            { /** Skills */}
            <View style={styles.container}>
                { /** Types */}
                <Text style={styles.title}>Base Abilities</Text>
                <View style={{
                    flexDirection: 'row'
                }}>
                    {
                        pokemon.abilities.map(({ ability }) => (
                            <Text style={styles.regularText} key={ability.name}> {ability.name} </Text>
                        ))
                    }
                </View>
            </View>
            { /** Skills */}
            { /** Movements */}
            <View style={styles.container}>
                { /** Types */}
                <Text style={styles.title}>Movements</Text>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {
                        pokemon.moves.map(({ move }) => (
                            <Text style={styles.regularText} key={move.name}> {move.name} </Text>
                        ))
                    }
                </View>
            </View>
            { /** Movements */}
            { /** Stats */}
            <View style={styles.container}>
                { /** Types */}
                <Text style={styles.title}>Stats</Text>
                <View>
                    {
                        pokemon.stats.map((stat, index) => (
                            <View key={stat.stat.name + index}
                                style={{
                                    flexDirection: 'row'
                                }}>
                                <Text style={{
                                    ...styles.regularText,
                                    width: 150
                                }} key={stat.stat.name}> {stat.stat.name} </Text>
                                <Text style={{
                                    ...styles.regularText,
                                    fontWeight: 'bold'
                                }}> {stat.base_stat} </Text>
                            </View>
                        ))
                    }
                </View>

                { /** Final sprite */}
                <View style={{
                    marginBottom: 20,
                    alignItems: 'center'
                }}>
                    <FadeInImage
                        uri={pokemon.sprites.front_default}
                        style={styles.basicSprite}
                    />
                </View>
            </View>
            { /** Stats */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 18
    },
    basicSprite: {
        height: 100,
        width: 100
    }
});