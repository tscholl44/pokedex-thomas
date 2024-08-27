//pokedex array
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

function showPokemon(pokemon) {
    if (pokemon.height >1.4){
        document.write(pokemon.name + ' height:' + pokemon.height + ' - Wow, thats big! </br>');
    }else {
        document.write(pokemon.name + ' height:' + pokemon.height + '</br>');
    } 
}
pokemonList.forEach(showPokemon);