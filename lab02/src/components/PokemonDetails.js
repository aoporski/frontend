function PokemonDetails({ pokemon }) {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} sprite`} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Abilities:</p>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonDetails;
