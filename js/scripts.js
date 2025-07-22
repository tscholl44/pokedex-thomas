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
        pokedexItem.classList.add("pokemon-card");
        
        // Create card content container
        let cardContent = document.createElement("div");
        cardContent.classList.add("pokemon-card-content");
        
        // Create image placeholder initially
        let imageContainer = document.createElement("div");
        imageContainer.classList.add("pokemon-image-placeholder");
        imageContainer.textContent = "Loading...";
        
        // Create pokemon name
        let pokemonName = document.createElement("h3");
        pokemonName.classList.add("pokemon-name");
        pokemonName.textContent = pokemon.name;
        
        // Create button
        let button = document.createElement("button");
        button.textContent = "View Details";
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokemonModal");
        button.classList.add("pokemon-button");
        
        // Assemble the card
        cardContent.appendChild(imageContainer);
        cardContent.appendChild(pokemonName);
        cardContent.appendChild(button);
        pokedexItem.appendChild(cardContent);
        pokedex.appendChild(pokedexItem);
        
        // Load the pokemon image after adding to DOM
        loadBasicDetails(pokemon).then(function() {
            if (pokemon.imageUrl) {
                let image = document.createElement("img");
                image.src = pokemon.imageUrl;
                image.alt = pokemon.name;
                image.classList.add("pokemon-image");
                image.onerror = function() {
                    imageContainer.textContent = "No Image";
                };
                imageContainer.replaceWith(image);
            }
        });
        
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
          item.weight = details.weight;
          item.types = details.types;
          item.abilities = details.abilities;
          item.baseExperience = details.base_experience;
        }).catch(function (e) {
          console.error(e);
        });
    }

    // Function to load basic details (just image) for card display
    function loadBasicDetails(item) {
        if (item.imageUrl) {
            return Promise.resolve(); // Already loaded
        }
        
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
        }).catch(function (e) {
          console.error(e);
        });
    }

//the showModal function takes in the pokemon object and displays detailed information

    function showModal(pokemon) {
        let modalTitle = document.querySelector("#pokemonModalLabel");
        let pokemonImage = document.querySelector("#pokemonImage");
        let pokemonHeight = document.querySelector("#pokemonHeight");
        let pokemonWeight = document.querySelector("#pokemonWeight");
        let pokemonTypes = document.querySelector("#pokemonTypes");
        let pokemonAbilities = document.querySelector("#pokemonAbilities");
        let pokemonExperience = document.querySelector("#pokemonExperience");
    
        modalTitle.textContent = pokemon.name;
        pokemonImage.src = pokemon.imageUrl || '';
        pokemonHeight.textContent = (pokemon.height / 10) + " m"; // Convert to meters
        pokemonWeight.textContent = (pokemon.weight / 10) + " kg"; // Convert to kilograms
        pokemonExperience.textContent = pokemon.baseExperience || "Unknown";
        
        // Display types
        pokemonTypes.innerHTML = '';
        if (pokemon.types) {
            pokemon.types.forEach(function(typeInfo) {
                let typeSpan = document.createElement("span");
                typeSpan.classList.add("pokemon-type");
                typeSpan.textContent = typeInfo.type.name;
                pokemonTypes.appendChild(typeSpan);
            });
        }
        
        // Display abilities
        if (pokemon.abilities) {
            let abilityNames = pokemon.abilities.map(function(abilityInfo) {
                return abilityInfo.ability.name;
            });
            pokemonAbilities.textContent = abilityNames.join(", ");
        }
    }
    

//function to show details using parameter: pokemon

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon); 
        });
    }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        loadBasicDetails: loadBasicDetails,
        showDetails: showDetails
    };
})();

//loading the data

pokemonRepository.loadList().then(function() {
    
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});



