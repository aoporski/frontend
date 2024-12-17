"use client";

import React from "react";
import Navigation from "../components/Navigation";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";

export default class PokemonLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPokemon: null,
      isLoading: false,
      error: null,
    };
  }

  handlePokemonImageClick = async (pokemonUrl) => {
    this.setState({ isLoading: true, error: null, selectedPokemon: null });

    try {
      const response = await fetch(pokemonUrl);
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }

      const pokemonDetails = await response.json();
      this.setState({ selectedPokemon: pokemonDetails, isLoading: false });
    } catch (error) {
      console.error("Error fetching Pokémon details:", error.message);
      this.setState({
        selectedPokemon: null,
        isLoading: false,
        error: error.message,
      });
    }
  };

  render() {
    const { selectedPokemon, isLoading, error } = this.state;

    return (
      <section>
        <Navigation />

        <PokemonList
          fetchPokemonDetails={(url) => this.handlePokemonImageClick(url)} // Pass the handler here
        />

        {isLoading ? (
          <p>Loading Pokémon details...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          selectedPokemon && (
            <div id="pokemon_details">
              <PokemonDetails pokemon={selectedPokemon} />
            </div>
          )
        )}
      </section>
    );
  }
}
