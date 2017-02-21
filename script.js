window.onload = function () {
    function clearErrorBlock() {
        contentName.style.display = 'none';
        contentType.style.display = 'none';
          attack.innerHTML = '404';
        defense.innerHTML = '404';
        containerNumber.classList.add('whiteNumberError');
        containerNumber.innerHTML = 'Who ?';
        circleValid.style.background = '';
    }
    var form = document.forms['form'];
    var name = document.querySelector('#pokemonName');
    var type = document.querySelector('#pokemonType');
    var circleValid = document.querySelector('#circleContainerImg');
    var errorBlock = document.querySelector('#errorBlock');
    var img = document.querySelector('#containerGrey');
    var contentName = document.querySelector('#name');
    var contentType = document.querySelector('#type');
    var containerNumber = document.querySelector('#whiteNumber');
    var attack = document.querySelector('#nbAttack');
    var defense = document.querySelector('#nbDefense');
    var pokemonReq = new XMLHttpRequest();
    pokemonReq.onload = reqListener();
    pokemonReq.open("get", "pokemons.json", true);
    pokemonReq.send();
    function reqListener() {
        form.onsubmit = function () {
            var pokemon = this.elements['search'].value;
            var maj = pokemon.charAt(0).toUpperCase();
            var pokeName = maj + pokemon.substring(1);
            var obj = JSON.parse(pokemonReq.responseText);
            var pokeValid = false;
            for (var i in obj) {
                if (obj[i].name == pokeName || i == pokeName) {
                    pokeValid = true;
                    errorBlock.innerHTML = '';
                    contentName.style.display = '';
                    contentType.style.display = '';
                    name.innerHTML = obj[i].name;
                    type.innerHTML = obj[i].type;
                    var cleanPokemon = obj[i].name.toLowerCase().replace(". ", "-").replace("\'", "");
                    if (isNaN(pokemon)) {
                        containerNumber.innerHTML = 'Id : ' + i;
                    } else {
                        containerNumber.innerHTML = obj[i].name;
                    }
                    attack.innerHTML = obj[i].attack;
                    defense.innerHTML = obj[i].defense;
            //Nidoran case
                    if(pokeName== 'Nidoran') {

                        if (confirm('Ok for a female,cancel for a man')){
                            cleanPokemon = cleanPokemon.replace('nidoran', 'nidoran-f');
                            attack.innerHTML = obj[29].attack;
                            defense.innerHTML = obj[29].defense;
                            if (isNaN(pokemon)) {
                                containerNumber.innerHTML = 'Id : ' + 29;
                            }
                        }else {

                            cleanPokemon = cleanPokemon.replace('nidoran', 'nidoran-m');
                            attack.innerHTML = obj[32].attack;
                            defense.innerHTML = obj[32].defense;
                            if (isNaN(pokemon)) {
                                containerNumber.innerHTML = 'Id : ' + 32;
                            }
                        }
                    }
                   if(pokeName == '29'){
                        cleanPokemon = cleanPokemon.replace('nidoran', 'nidoran-f');
                        attack.innerHTML = obj[29].attack;
                        defense.innerHTML = obj[29].defense;
                        containerNumber.innerHTML =obj[29].name;
                    }
                    if(pokeName == '32'){
                        cleanPokemon = cleanPokemon.replace('nidoran', 'nidoran-m');
                    }
            //End of Nidoran case
                    img.innerHTML = '<img class="img" src="http://img.pokemondb.net/artwork/' + cleanPokemon + '.jpg">';
                    circleValid.style.background = 'green';
                }
            }
            if (pokeValid === false) {
                if (isNaN(pokemon)) {
                    errorBlock.classList.add('errorBlock');
                    errorBlock.innerHTML = pokeName + ' not found';
                    clearErrorBlock();
                    img.innerHTML = '<img class="imgError" src="http://image.noelshack.com/fichiers/2014/28/1405038568-063.png">';
                } else {
                    errorBlock.classList.add('errorBlock');
                    errorBlock.innerHTML = 'Pokémon number ' + pokeName + ' not found';
                    clearErrorBlock();
                    img.innerHTML = '<img class="imgError" src="http://image.noelshack.com/fichiers/2014/28/1405038568-063.png">';
                }
            }
            return false;
        };
    }
};