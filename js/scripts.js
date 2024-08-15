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

//loop to iterate over each item until a specified attribute is identified
for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
    if (pokemon.height >1.4){
        document.write(pokemon.name + ' height:' + pokemon.height + ' - Wow, thats big! </br>');
    }else {
        document.write(pokemon.name + ' height:' + pokemon.height + '</br>');
    }
}