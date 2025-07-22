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
        console.log("Creating card for:", pokemon.name);
        let pokedex = document.querySelector(".pokemon-list");
        console.log("Found pokemon-list element:", pokedex);
        
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
        
        console.log("Card created and added to DOM for:", pokemon.name);
        
        // Load the pokemon image after adding to DOM
        pokemonRepository.loadBasicDetails(pokemon).then(function() {
            console.log("Basic details loaded for:", pokemon.name, "Image URL:", pokemon.imageUrl);
            if (pokemon.imageUrl) {
                let image = document.createElement("img");
                image.src = pokemon.imageUrl;
                image.alt = pokemon.name;
                image.classList.add("pokemon-image");
                image.onerror = function() {
                    imageContainer.textContent = "No Image";
                };
                imageContainer.replaceWith(image);
            } else {
                imageContainer.textContent = "No Image Available";
            }
        }).catch(function(error) {
            console.error("Error loading image for", pokemon.name, error);
            imageContainer.textContent = "Image Error";
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
        pokemonHeight.textContent = pokemon.height ? (pokemon.height / 10) + " m" : "Unknown"; // Convert to meters
        pokemonWeight.textContent = pokemon.weight ? (pokemon.weight / 10) + " kg" : "Unknown"; // Convert to kilograms
        pokemonExperience.textContent = pokemon.baseExperience || "Unknown";
        
        // Display types
        pokemonTypes.innerHTML = '';
        if (pokemon.types && pokemon.types.length > 0) {
            pokemon.types.forEach(function(typeInfo) {
                let typeSpan = document.createElement("span");
                typeSpan.classList.add("pokemon-type");
                typeSpan.textContent = typeInfo.type.name;
                pokemonTypes.appendChild(typeSpan);
            });
        } else {
            pokemonTypes.textContent = "Unknown";
        }
        
        // Display abilities
        if (pokemon.abilities && pokemon.abilities.length > 0) {
            let abilityNames = pokemon.abilities.map(function(abilityInfo) {
                return abilityInfo.ability.name;
            });
            pokemonAbilities.textContent = abilityNames.join(", ");
        } else {
            pokemonAbilities.textContent = "Unknown";
        }
    }
    

//function to show details using parameter: pokemon

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon); 
        });
    }
    
    // Function to filter and display pokemon
    function filterPokemon(searchTerm) {
        let filteredPokemon = pokemonList.filter(function(pokemon) {
            return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        
        // Clear current display
        let pokemonListElement = document.querySelector(".pokemon-list");
        pokemonListElement.innerHTML = '';
        
        // Display filtered pokemon
        filteredPokemon.forEach(function(pokemon) {
            addListItem(pokemon);
        });
        
        return filteredPokemon;
    }
    
    // Function to show all pokemon
    function showAllPokemon() {
        let pokemonListElement = document.querySelector(".pokemon-list");
        pokemonListElement.innerHTML = '';
        
        pokemonList.forEach(function(pokemon) {
            addListItem(pokemon);
        });
    }
    
    // Function to get suggestions
    function getSuggestions(searchTerm) {
        if (searchTerm.length < 1) {
            return [];
        }
        
        return pokemonList
            .filter(function(pokemon) {
                return pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase());
            })
            .slice(0, 5) // Limit to 5 suggestions
            .map(function(pokemon) {
                return pokemon.name;
            });
    }
    
    // Function to setup search functionality
    function setupSearch() {
        console.log("Setting up search functionality...");
        
        let searchInput = document.getElementById('pokemonSearch');
        let searchButton = document.getElementById('searchButton');
        let showAllButton = document.getElementById('showAllButton');
        let suggestionsContainer = document.getElementById('searchSuggestions');
        
        console.log("Search elements found:", {
            searchInput: !!searchInput,
            searchButton: !!searchButton,
            showAllButton: !!showAllButton,
            suggestionsContainer: !!suggestionsContainer
        });
        
        if (!searchInput || !searchButton || !showAllButton || !suggestionsContainer) {
            console.error("One or more search elements not found!");
            return;
        }
        
        let selectedSuggestionIndex = -1;
        
        // Search input event listener
        searchInput.addEventListener('input', function() {
            let searchTerm = this.value.trim();
            
            if (searchTerm.length === 0) {
                suggestionsContainer.style.display = 'none';
                return;
            }
            
            let suggestions = getSuggestions(searchTerm);
            
            if (suggestions.length > 0) {
                suggestionsContainer.innerHTML = '';
                suggestions.forEach(function(suggestion, index) {
                    let suggestionElement = document.createElement('div');
                    suggestionElement.classList.add('suggestion-item');
                    suggestionElement.textContent = suggestion;
                    
                    suggestionElement.addEventListener('click', function() {
                        searchInput.value = suggestion;
                        suggestionsContainer.style.display = 'none';
                        performSearch(suggestion);
                    });
                    
                    suggestionsContainer.appendChild(suggestionElement);
                });
                suggestionsContainer.style.display = 'block';
                selectedSuggestionIndex = -1;
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });
        
        // Keyboard navigation for suggestions
        searchInput.addEventListener('keydown', function(e) {
            let suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, suggestions.length - 1);
                updateSuggestionHighlight(suggestions);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
                updateSuggestionHighlight(suggestions);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
                    let selectedText = suggestions[selectedSuggestionIndex].textContent;
                    searchInput.value = selectedText;
                    suggestionsContainer.style.display = 'none';
                    performSearch(selectedText);
                } else {
                    performSearch(searchInput.value.trim());
                }
            } else if (e.key === 'Escape') {
                suggestionsContainer.style.display = 'none';
                selectedSuggestionIndex = -1;
            }
        });
        
        function updateSuggestionHighlight(suggestions) {
            suggestions.forEach(function(suggestion, index) {
                if (index === selectedSuggestionIndex) {
                    suggestion.classList.add('highlighted');
                } else {
                    suggestion.classList.remove('highlighted');
                }
            });
        }
        
        function performSearch(searchTerm) {
            if (searchTerm) {
                let results = filterPokemon(searchTerm);
                if (results.length === 0) {
                    alert('No Pokémon found with that name. Try a different search term.');
                }
            }
            suggestionsContainer.style.display = 'none';
        }
        
        // Search button click
        searchButton.addEventListener('click', function() {
            let searchTerm = searchInput.value.trim();
            performSearch(searchTerm);
        });
        
        // Show all button click
        showAllButton.addEventListener('click', function() {
            searchInput.value = '';
            showAllPokemon();
            suggestionsContainer.style.display = 'none';
        });
        
        // Click outside to hide suggestions
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        loadBasicDetails: loadBasicDetails,
        showDetails: showDetails,
        filterPokemon: filterPokemon,
        showAllPokemon: showAllPokemon,
        setupSearch: setupSearch
    };
})();

//loading the data

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, starting Pokemon loading...");
    
    pokemonRepository.loadList().then(function() {
        console.log("Pokemon list loaded:", pokemonRepository.getAll().length, "pokemon");
        
        // Sort pokemon alphabetically
        let allPokemon = pokemonRepository.getAll();
        allPokemon.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
        
        // Display sorted pokemon
        allPokemon.forEach(function(pokemon){
            console.log("Adding pokemon:", pokemon.name);
            pokemonRepository.addListItem(pokemon);
        });
        
        // Setup search functionality after pokemon are loaded
        console.log("About to setup search...");
        pokemonRepository.setupSearch();
        console.log("Search setup completed!");
    });
});



