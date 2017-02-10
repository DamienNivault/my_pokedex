window.onload = function () {
    var form = document.forms['form'];
    var name = document.querySelector('#pokemonName');
    var type = document.querySelector('#pokemonType');
    var circleValid = document.querySelector('#circleContainerImg');
    var errorBlock = document.querySelector('#container_pokemon_name');
    var contentImg = document.querySelector('#containerBlack');
   // var buttonRight =  document.querySelector('#buttonRight');
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
                    name.innerHTML = (obj[i].name);
                    type.innerHTML = (obj[i].type);
                    contentImg.innerHTML = '<img class="img" src="http://img.pokemondb.net/artwork/' + obj[i].name.toLowerCase().replace(". ","-").replace("\'","") + '.jpg">';
                    circleValid.style.background="green";
                   /* buttonRight.onclick= function (){
                        contentImg.innerHTML = '<img class="img" src="http://img.pokemondb.net/artwork/' + obj[i+1].name.toLowerCase().replace(". ","-").replace("\'","") + '.jpg">';
                        console.log(obj[i]);
                    }*/
                }
            }
            if(pokeValid === false) {
                if(isNaN(pokemon))
                {
                    errorBlock.classList.add('errorBlock');
                    errorBlock.innerHTML = pokeName + ' not found';
                    name.innerHTML = '';
                    type.innerHTML = '';
                    contentImg.innerHTML = '';
                    circleValid.style.background="red";
                    contentImg.innerHTML = '<img class="imgError" src="http://image.noelshack.com/fichiers/2014/28/1405038568-063.png">';
                }else{

                    errorBlock.classList.add('errorBlock');
                    errorBlock.innerHTML = 'Pokémon number ' +pokeName+ ' not found' ;
                    name.innerHTML = '';
                    type.innerHTML = '';
                    contentImg.innerHTML = '';
                    circleValid.style.background="red";
                    contentImg.innerHTML = '<img class="imgError" src="http://image.noelshack.com/fichiers/2014/28/1405038568-063.png">';
                }
            }
            return false;
        };
    }
};