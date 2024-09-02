//pokedex array
//pokemon repository variable to hold the IIFE return
let pokemonRepository = (function () {
    let pokemonList = [
        {
            name:"Golem",
            height: 1.5,
            type:["rock", "ground"]
        },
        {
            name:"Nidoking",
            height: 1.4,
            type: ["ground", "poison"]
        },
        {
            name:"Wigglypuff",
            height: 1, 
            type: ["fairy", "normal"]
        }
    ];

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

//function to show details using parameter: pokemon
    function showDetails(pokemon) {
        console.log(pokemon.name)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

//forEach method to iterate through and write pokemon
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});



