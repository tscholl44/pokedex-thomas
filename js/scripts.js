//pokedex array
//pokemon repository variable to hold the IIFE return
let pokemonRepository = (function () {
    let pokemonList = [
        {
            name:'Golem',
            height: 1.5,
            type:['rock', 'ground']
        },
        {
            name:'Nidoking',
            height: 1.4,
            type: ['ground', 'poison']
        },
        {
            name:'Wigglypuff',
            height: 1, 
            type: ['fairy', 'normal']
        }
    ];

//function to add a single item to the pokemonList
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

//function to return all items 
    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

//forEach method to iterate through and write pokemon
function showPokemon(pokemon) {
    if (pokemon.height >1.4){
        document.write(pokemon.name + ' height:' + pokemon.height + ' - Wow, thats big! </br>');
    }else {
        document.write(pokemon.name + ' height:' + pokemon.height + '</br>');
    } 
}
let getPokemon = pokemonRepository.getAll()
getPokemon.forEach(showPokemon);