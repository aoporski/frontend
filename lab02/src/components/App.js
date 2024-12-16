class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      selectedPokemon: null,
      searchQuery: "",
    };
  }

  async fetchListData() {
    const url = "https://pokeapi.co/api/v2/pokemon";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ pokemons: data.results });
    } catch (error) {
      console.error("Error fetching Pokémon list:", error.message);
    }
  }

  async fetchPokemonDetails(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ selectedPokemon: data });
    } catch (error) {
      console.error("Unable to get Pokémon details:", error.message);
    }
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  // Search Pokémon by name
  handleSearchClick = async () => {
    const { searchQuery } = this.state;
    if (searchQuery.trim()) {
      const url = `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        this.setState({ selectedPokemon: data });
      } catch (error) {
        console.error("Unable to get Pokémon details:", error.message);
        this.setState({ selectedPokemon: null });
      }
    }
  };

  componentDidMount() {
    this.fetchListData();
  }

  render() {
    const { pokemons, selectedPokemon, searchQuery } = this.state;

    return (
      <section id="pokemons">
        <div id="search_bar">
          <input
            type="text"
            id="pokemon_search"
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Search Pokémon"
          />
          <button id="search_button" onClick={this.handleSearchClick}>
            Search
          </button>
        </div>

        <div id="pokemon_info">
          {selectedPokemon ? (
            <PokemonDetails pokemon={selectedPokemon} />
          ) : (
            <p>Select a Pokémon to view details</p>
          )}
        </div>

        <PokemonList
          pokemons={pokemons}
          fetchPokemonDetails={(url) => this.fetchPokemonDetails(url)}
        />
      </section>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
