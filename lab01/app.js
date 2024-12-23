async function getData() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    pokemonList(data);
    searchPokemon();
  } catch (error) {
    console.error(error.message);
  }
}

function pokemonList(data) {
  const list = document.getElementById("pokemon_list");
  list.innerHTML = "";

  if (Array.isArray(data.results) && data.results.length > 0) {
    data.results.forEach((item, i) => {
      const element = document.createElement("li");
      element.innerText = `${i + 1}. ${item.name}`;
      element.onclick = () => singlePokemonData(i + 1);
      list.appendChild(element);

      const image = document.createElement("img", (id = "image"));
      image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
        i + 1
      }.png`;
      image.onclick = () => singlePokemonData(i + 1);
      list.append(image);
    });
  } else {
    list.innerHTML = "<li>No Pokemon found</li>";
  }
}

async function singlePokemonData(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const info = document.getElementById("pokemon_info");
    const data = await response.json();
    info.innerText = `Name: ${data.name}\nHeight: ${data.height}\nWeight: ${
      data.weight
    }\nTypes: ${data.types.map((type) => type.type.name).join(", ")}`;
  } catch (error) {
    info.innerText = "Unable to get pokemon data";
    console.error(error.message);
  }
}

function searchPokemon() {
  const searchBar = document.getElementById("pokemon_search");
  const searchButon = document.getElementById("search_button");
  searchButon.onclick = async () => {
    const name = searchBar.value.toLowerCase();
    try {
      const data = await singlePokemonData(name);
      if (!data) {
        throw new Error(`Response status: ${response.status}`);
      }

      const info = document.getElementById("pokemon_info");
      info.innerText = `Name: ${data.name}\nHeight: ${data.height}\nWeight: ${
        data.weight
      }\nTypes: ${data.types.map((type) => type.type.name).join(", ")}`;
    } catch (error) {
      info.innerText = "Unable to get pokemon data";
      console.error(error.message);
    }
  };
}

getData();
