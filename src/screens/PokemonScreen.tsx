import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Text, View } from 'react-native'
import { RootStackParams } from '../navigator/Navigator'

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

export const PokemonScreen = ({ navigation, route }: Props) => {

    const { simplePokemon, color } = route.params;

    return <View>
        <Text>{ simplePokemon.name} - { color }</Text>
    </View>
}