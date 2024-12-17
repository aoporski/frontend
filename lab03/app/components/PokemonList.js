"use client";

import React from "react";
import PokemonDetails from "./PokemonDetails";

export default class PokemonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      type: "",
      search: "",
      limit: 20,
      selectedPokemon: null,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);

    const type = params.get("type") || "";
    const search = params.get("search") || "";
    const limit = parseInt(params.get("limit"), 10) || 20;

    this.setState({ type, search, limit }, this.fetchPokemons);
  }

  updateUrl() {
    const { type, search, limit } = this.state;
    const params = new URLSearchParams();

    if (type) params.set("type", type);
    if (search) params.set("search", search);
    if (limit) params.set("limit", limit);

    window.history.pushState({}, "", `?${params.toString()}`);
  }

  handleFilterChange = (filterName, value) => {
    this.setState({ [filterName]: value }, () => {
      this.updateUrl();
      this.fetchPokemons();
    });
  };

  fetchPokemons = async () => {
    const { type, search, limit } = this.state;

    this.setState({ isLoading: true, error: null });

    try {
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
      const response = await fetch(url);
      const data = await response.json();

      let pokemons = data.results;

      let pokemonsWithSprites = await Promise.all(
        pokemons.map(async (pokemon) => {
          const pokemonDetailsResponse = await fetch(pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();
          return {
            ...pokemon,
            sprites: pokemonDetails.sprites,
          };
        })
      );

      if (type) {
        const typeResponse = await fetch(
          `https://pokeapi.co/api/v2/type/${type.toLowerCase()}`
        );
        const typeData = await typeResponse.json();
        const typePokemons = typeData.pokemon.map((p) => p.pokemon.name);

        pokemonsWithSprites = pokemonsWithSprites.filter((p) =>
          typePokemons.includes(p.name)
        );
      }

      if (search) {
        pokemonsWithSprites = pokemonsWithSprites.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      this.setState({ pokemons: pokemonsWithSprites, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  selectPokemon = (pokemonUrl) => {
    this.setState({ isLoading: true, error: null });

    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ selectedPokemon: data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, isLoading: false });
      });
  };

  goBackToList = () => {
    this.setState({ selectedPokemon: null });
  };

  render() {
    const { pokemons, type, search, limit, selectedPokemon, isLoading, error } =
      this.state;

    return (
      <div>
        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => this.handleFilterChange("type", e.target.value)}
          >
            <option value="">All</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
          </select>

          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => this.handleFilterChange("search", e.target.value)}
            placeholder="Search by name"
          />

          <label htmlFor="limit">Limit:</label>
          <input
            type="number"
            id="limit"
            value={limit}
            onChange={(e) =>
              this.handleFilterChange("limit", parseInt(e.target.value, 10))
            }
          />
        </div>

        {isLoading ? (
          <p>Loading Pokémon...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : selectedPokemon ? (
          <PokemonDetails
            pokemon={selectedPokemon}
            goBack={this.goBackToList}
          />
        ) : (
          <ul>
            {pokemons.map((pokemon, index) => (
              <li key={index}>
                <div>
                  <p>{pokemon.name}</p>
                  <img
                    src={
                      pokemon.sprites?.front_shiny ||
                      pokemon.sprites?.front_default
                    }
                    alt={`${pokemon.name} sprite`}
                    style={{
                      width: "100px",
                      height: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => this.selectPokemon(pokemon.url)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
