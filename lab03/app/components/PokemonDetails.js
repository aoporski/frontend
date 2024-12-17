"use client";

import React from "react";

class PokemonDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      isClient: false,
    };
  }

  componentDidMount() {
    this.setState({ isClient: true });
  }

  toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const { pokemon } = this.props;

    if (this.state.isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      this.setState({ isFavorite: false });
    } else {
      favorites.push(pokemon);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      this.setState({ isFavorite: true });
    }
  };

  render() {
    const { pokemon } = this.props;

    if (!this.state.isClient) {
      return null;
    }

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
        <button onClick={this.props.goBack}>Back to List</button>
        <button onClick={this.toggleFavorite}>
          {this.state.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    );
  }
}

export default PokemonDetails;
