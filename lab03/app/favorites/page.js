"use client";

import React from "react";
import PokemonDetails from "../components/PokemonDetails";

class FavoritesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      selectedPokemon: null,
    };
  }

  componentDidMount() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.setState({ favorites });
  }

  removeFromFavorites = (pokemonId) => {
    const { favorites } = this.state;
    const updatedFavorites = favorites.filter((fav) => fav.id !== pokemonId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    this.setState({ favorites: updatedFavorites });
  };

  selectPokemon = (pokemon) => {
    this.setState({ selectedPokemon: pokemon });
  };

  goBackToFavorites = () => {
    this.setState({ selectedPokemon: null });
  };

  render() {
    const { favorites, selectedPokemon } = this.state;

    return (
      <div>
        {selectedPokemon ? (
          <div>
            <PokemonDetails
              pokemon={selectedPokemon}
              goBack={this.goBackToFavorites}
            />
            <button onClick={this.goBackToFavorites}>Back to Favorites</button>
          </div>
        ) : (
          <>
            {favorites.length === 0 ? (
              <p>No favorites added yet!</p>
            ) : (
              <ul>
                {favorites.map((pokemon) => (
                  <li key={pokemon.id}>
                    <p>{pokemon.name}</p>
                    <img
                      src={pokemon.sprites.front_shiny}
                      alt={`${pokemon.name} sprite`}
                      onClick={() => this.selectPokemon(pokemon)}
                    />
                    <button
                      onClick={() => this.removeFromFavorites(pokemon.id)}
                    >
                      Remove from Favorites
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    );
  }
}

export default FavoritesPage;
