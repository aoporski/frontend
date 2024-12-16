function PokemonList({ pokemons, fetchPokemonDetails }) {
  if (!Array.isArray(pokemons)) {
    console.error("Invalid pokemons data: Expected an array, got", pokemons);
    return null;
  }

  return (
    <ul id="pokemon_list">
      {pokemons.map((pokemon, index) => (
        <li key={index} onClick={() => fetchPokemonDetails(pokemon.url)}>
          {index + 1}. {pokemon.name}
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
              index + 1
            }.png`}
            alt={pokemon.name}
          />
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;
