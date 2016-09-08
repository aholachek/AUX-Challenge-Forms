require('./scss/styles.scss');
//hack to get webpack devserver to watch index.html
require('./index.html');

var cardvalidate = require('credit-card-validation');

function addSelectVals(){
  var monthSelect = document.getElementById('expiration-month'),
      yearSelect = document.getElementById('expiration-year');

      var monthFragment = document.createDocumentFragment(),
      yearFragment = document.createDocumentFragment();

  //add months to dropdown
    for (var i = 0; i < 12; i++){
      var option = document.createElement('option');
      option.textContent = i + 1;
      option.value = i + 1;
      monthFragment.appendChild(option);
    }

  //add years to dropdown
  var start = 2016;
  for (var i = 0; i < 5; i++){
    var option = document.createElement('option');
    option.textContent = start + i;
    option.value = start + i;
    yearFragment.appendChild(option);
  }

  monthSelect.appendChild(monthFragment);
  yearSelect.appendChild(yearFragment);

}

document.addEventListener('DOMContentLoaded', function(event) {

  //add month and year selects
  addSelectVals();

  //only show invalid styles once user has blurred out of a field
  [].slice.apply(document.querySelectorAll('input')).forEach(function(el){

    //the first time an element is blurred, add a class to facilitate CSS :invalid styling
    function addNoticeOnBlur(){
        this.className += ' interacted-width';
        this.removeEventListener('blur', addNoticeOnBlur);
    }

    var listener = el.addEventListener('blur', addNoticeOnBlur);

  });

  //credit card validation
  document.getElementById('card-number').addEventListener('change', function(){

    var card = cardvalidate(this.value);
    var spriteContainer = document.querySelector('.sprite-container');

    if (card.isValid()){
      var sprite = document.createElement('div');
      sprite.className = 'sprite sprite--' + card.type ;
      spriteContainer.innerHTML = '';
      spriteContainer.appendChild(sprite);
    } else {
      spriteContainer.innerHTML = '';
    }

  });

});
