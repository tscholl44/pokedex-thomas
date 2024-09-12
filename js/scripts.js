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
        let button = document.createElement("button")
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        pokedexItem.appendChild(button);
        pokedex.appendChild(pokedexItem);
        //add an event listener for clicking a button
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

    }



// The LoadList() method will fetch data from the API, then add each Pokémon in the fetched data to pokemonList with the add function
    
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

    function showModal(title, text, img) {
        let modalContainer = document.querySelector('#modal-container');
      
        // Clear all existing modal content
        modalContainer.innerHTML = '';
      
        let modal = document.createElement('div');
        modal.classList.add('modal');
      
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
      
        let pokemonName = document.createElement('h1');
        pokemonName.innerText = title;
    
        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = text;

        let pokemonImage = document.createElement('img')
        pokemonImage.setAttribute('src', img);
        pokemonImage.setAttribute('width', '100%');
        pokemonImage.setAttribute('height', '100%');
      
        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);
      
        modalContainer.classList.add('is-visible');
    
        modalContainer.addEventListener('click', (e) => {
          // Since this is also triggered when clicking INSIDE the modal
          // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    
    }
    
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
        }
    });


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

//forEach method to iterate through and write pokemon
console.log(pokemonRepository.getAll());

// Loading the data
pokemonRepository.loadList().then(function() {
    
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});



