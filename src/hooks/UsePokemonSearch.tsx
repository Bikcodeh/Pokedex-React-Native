import { useEffect, useRef, useState } from "react";
import { pokemonApi } from './../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from './../interfaces/pokemonsInterfaces';

export const usePokemonSearch = () => {

    const [isFetching, setIsLFetching] = useState(true);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])

    const loadPokemons = async () => {
        setIsLFetching(true);
        const resp = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');
        mapPokemonListToSimplePokemon(resp.data.results);
    }

    const mapPokemonListToSimplePokemon = (pokemonList: Result[]) => {
        const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
            const urlParts = url.split('/');
            const id = urlParts[ urlParts.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return { id, picture, name }
        });

        setSimplePokemonList(newPokemonList);
        setIsLFetching(false);
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        loadPokemons,
        isFetching,
        pokemons: simplePokemonList
    }
}
