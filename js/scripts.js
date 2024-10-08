//pokedex array
//pokemon repository variable to hold the IIFE return
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    

//function to add a single item to the pokemonList

    function add(pokemon) {
        // check if the parameter is an object and not null
        if (typeof pokemon === "object" && pokemon !== null) {
            pokemonList.push(pokemon);
        } else {
            console.log("Not an object");
        }
    }

//function to return all items 

    function getAll() {
        return pokemonList;
    }

//function to add pokemon to the pokemon list as a list item

    function addListItem(pokemon) {
        let pokedex = document.querySelector(".pokemon-list");
        let pokedexItem = document.createElement("li");
        pokedexItem.classList.add("list-group-item")
        let button = document.createElement("button")
        button.innerText = pokemon.name;
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokemonModal");
        button.classList.add("btn", "btn-primary");
        pokedexItem.appendChild(button);
        pokedex.appendChild(pokedexItem);
        //add an event listener for clicking a button
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

    }



//the LoadList() method will fetch data from the API, then add each Pokémon in the fetched data to pokemonList with the add function
    
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

//the loadDetails() function takes in item and fetches the appropriate pokemon details 

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

//the showModal function takes in the elements I want to include in the modal

    function showModal(title, text, img) {
        let modalTitle = document.querySelector("#pokemonModalLabel");
        let pokemonHeight = document.querySelector("#pokemonHeight");
        let pokemonImage = document.querySelector("#pokemonImage");
    
        modalTitle.innerText = title;
        pokemonHeight.innerText = text;
        pokemonImage.setAttribute('src', img);
    }
    

//function to show details using parameter: pokemon

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(
                pokemon.name,
                "Height: " + pokemon.height,
                pokemon.imageUrl
            ); 
        });
    }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

//loading the data

pokemonRepository.loadList().then(function() {
    
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});



