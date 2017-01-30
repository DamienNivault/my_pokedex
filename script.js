window.onload = function () {
    var form = document.forms['form'];
    var name = document.querySelector('#pokemonName');
    var type = document.querySelector('#type');
    var errorBlock = document.querySelector('#blockError');
    var contentImg = document.querySelector('#content_img');
    var pokemonReq = new XMLHttpRequest();
    pokemonReq.onload = reqListener();
    pokemonReq.open("get", "pokemons.json", true);
    pokemonReq.send();


    function reqListener() {
        form.onsubmit = function () {
            var pokemon = document.querySelector('#search').value;
            var obj = JSON.parse(pokemonReq.responseText);
            var pokeValid= false;
            for (var i in obj) {
                if (obj[i].name == pokemon || i == pokemon) {
                    pokeValid = true;
                    errorBlock.innerHTML='';
                    name.innerHTML = (obj[i].name);
                    type.innerHTML = (obj[i].type);
                    contentImg.innerHTML = '<img class="img" src="http://img.pokemondb.net/artwork/' + obj[i].name.toLowerCase().replace(". ", "-") + '.jpg">'; // replace for Mr Mime
                }
            }
            if(pokeValid === false) {
                if(isNaN(pokemon))
                {
                    errorBlock.innerHTML = pokemon + 'not found';
                    name.innerHTML = '';
                    type.innerHTML = '';
                    contentImg.innerHTML = '';
                }else{
                    errorBlock.innerHTML = 'Pokémon number' +pokemon+' not found' ;
                    name.innerHTML = '';
                    type.innerHTML = '';
                    contentImg.innerHTML = '';
                }
            }
            return false;
        };
    }
};