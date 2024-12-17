"use client";
import PokemonDetails from "../../components/PokemonDetails";

async function fetchPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon details");
  }
  return response.json();
}

export default async function PokemonPage({ params }) {
  const pokemon = await fetchPokemon(params.id);

  return (
    <div>
      <h1>Details for Pokémon #{params.id}</h1>
      <PokemonDetails pokemon={pokemon} />
    </div>
  );
}
