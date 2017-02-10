window.onload = function () {
    function clearErrorBlock(){
        contentName.style.display='none';
        contentType.style.display='none';
        contentImg.innerHTML = '';
        attack.innerHTML = '404';
        defense.innerHTML = '404';
        containerNumber.classList.add('whiteNumberError');
        containerNumber.innerHTML='Who ?';
        circleValid.style.background='';
    }

    var form = document.forms['form'];
    var name = document.querySelector('#pokemonName');
    var type = document.querySelector('#pokemonType');
    var circleValid = document.querySelector('#circleContainerImg');
    var errorBlock = document.querySelector('#errorBlock');
    var contentImg = document.querySelector('#containerGrey');
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
            var pokeValid= false;
            for (var i in obj) {
                if (obj[i].name == pokeName || i == pokeName) {

                    pokeValid = true;
                    errorBlock.innerHTML='';
                    contentName.style.display='';
                    contentType.style.display='';
                    name.innerHTML = obj[i].name;
                    type.innerHTML = obj[i].type;
                    var cleanPokemon = obj[i].name.toLowerCase().replace(". ","-").replace("\'","").replace('nidoran',"nidoran-m");
                    contentImg.innerHTML = '<img class="img" src="http://img.pokemondb.net/artwork/' + cleanPokemon +'.jpg">';
                    circleValid.style.background='green';
                    if(isNaN(pokemon)){
                        containerNumber.innerHTML = 'Id : ' + i;
                    }else{
                        containerNumber.innerHTML= obj[i].name;
                    }
                    attack.innerHTML = obj[i].attack;
                    defense.innerHTML = obj[i].defense;
                }
            }
            if(pokeValid === false) {
                if(isNaN(pokemon))
                {
                    errorBlock.classList.add('errorBlock');
                    errorBlock.innerHTML = pokeName + ' not found';
                        clearErrorBlock();
                    contentImg.innerHTML = '<img class="imgError" src="http://image.noelshack.com/fichiers/2014/28/1405038568-063.png">';
                }else{

                    errorBlock.classList.add('errorBlock');
                    errorBlock.innerHTML = 'Pokémon number ' +pokeName+ ' not found' ;
                    clearErrorBlock();
                    contentImg.innerHTML = '<img class="imgError" src="http://image.noelshack.com/fichiers/2014/28/1405038568-063.png">';
                }
            }
            return false;
        };
    }
};