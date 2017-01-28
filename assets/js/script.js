/**
 * Created by Dam's on 28/01/2017.
 */
window.onload =function () {
  var form= document.forms['form'];
  form.onsubmit = function(){
      var pokemon = document.querySelector('#search').value;
      console.log(pokemon);
      return false;
  };

    $.ajax({
        type:       "get",
        url:        "pokemons.json",
        dataType:   "json",
        success: function(data){
            JSON.stringify(data);
            console.log(data);
        },
        error:  function(err){
            console.log('SHit happends');

        }

    });
};