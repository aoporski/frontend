import Link from "next/link";

export default async function PokemonPage({ searchParams }) {
  const { search = "", type = "", limit = "20" } = searchParams;

  let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  if (search) {
    apiUrl = `https://pokeapi.co/api/v2/pokemon/${search}`;
  }
  if (type) {
    apiUrl = `https://pokeapi.co/api/v2/type/${type}`;
  }

  const res = await fetch(apiUrl);
  const data = await res.json();

  const pokemons = data.results
    ? data.results.map((pokemon, index) => ({
        id: index + 1,
        name: pokemon.name,
      }))
    : [];

  return (
    <div>
      <h1>Lista Pokemonów</h1>

      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
