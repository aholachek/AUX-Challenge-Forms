require('./scss/styles.scss');
//hack to get webpack devserver to watch index.html
require('./index.html');

var cardValidate = require('credit-card-validation');
var _ = require('lodash');

require('./form_polyfill')

function addSelectVals() {
  var monthSelect = document.getElementById('expiration-month'),
    yearSelect = document.getElementById('expiration-year');

  var monthFragment = document.createDocumentFragment(),
    yearFragment = document.createDocumentFragment();

  //add months to dropdown
  for (var i = 0; i < 12; i++) {
    var option = document.createElement('option');
    option.textContent = i + 1;
    option.value = i + 1;
    monthFragment.appendChild(option);
  }

  //add years to dropdown
  var start = 2016;
  for (var i = 0; i < 5; i++) {
    var option = document.createElement('option');
    option.textContent = start + i;
    option.value = start + i;
    yearFragment.appendChild(option);
  }

  monthSelect.appendChild(monthFragment);
  yearSelect.appendChild(yearFragment);

}

//from https://stackoverflow.com/questions/72768/how-do-you-detect-credit-card-type-based-on-number

var cardPatterns = {
  amex : /^34|^37/,
  visa : /^4/,
  discover : /^6011|^644|^65/,
  mastercard : /^5[1-5]/
};

function checkCardValid() {
  var card = cardValidate(document.getElementById('card-number').value);
  return card.isValid();
}

function updateCardValidity() {
  var input = document.getElementById('card-number');
  if (!checkCardValid()) {
    if (!/invalid/.test(input.className)) input.className += ' invalid';

  } else {
    input.className = input.className.replace('invalid', '')
  }
}

function enableCreditCardValidation() {
  //credit card validation
  function onChange() {
    var currentVal = this.value;
    var card = cardValidate(currentVal);
    var spriteContainer = document.querySelector('.sprite-container');


    [].slice.apply(document.querySelectorAll('.card-sprite')).forEach(function(el){
      addClass.call(el, 'faded');
    });

    //check if matches any cc patterns, just the beginning
    _.forEach(cardPatterns, function(p, k){
      if (currentVal.match(p)){
        removeClass.call(document.querySelector('.card-sprite--' + k ), 'faded')
      }
    }, this);

    updateCardValidity();
  }

  document.getElementById('card-number').addEventListener('keyup', onChange);

}

function checkSelectValid() {
  var selected = [].slice.apply(this.childNodes)
    .filter(function(el) {
      return el.selected
    })[0]
    .textContent;

  if (selected === 'Month' || selected === 'Year') {
    //user hasn't selected anything
    this.className += ' invalid'
  } else {
    this.className.replace('invalid', '');
  }
}

function enableSelectValidation() {
  //need to manually add invalid class to selects since
  //I can't figure out how to add :invalid with just HTML!
    [].slice.apply(document.querySelectorAll('.challenge-form select'))
    .forEach(function(el) {
      el.addEventListener('blur', checkSelectValid);
    });
}

function addClass(cl){
  if (!(new RegExp(cl).test(this.className))){
    this.className += ' ' + cl;
  }
}

function removeClass(cl){
  return this.className = this.className.replace(cl, '');
}

//called with context of an element
function showWarning() {
  addClass.call(this, 'show-warning')
}

//the first time an element is blurred, add a class to facilitate CSS :invalid styling
function addBlurEvent() {
  //only show invalid styles once user has blurred out of a field
  [].slice.apply(document.querySelectorAll('.challenge-form input')).forEach(function(el) {
    var listener = el.addEventListener('blur', showWarning);
  });
}

//on submit, show warnings for any invalid fields
function addSubmitListener() {
  document.querySelector('.challenge-form form button[type=submit]').addEventListener('click', function() {
    [].slice.apply(document.querySelectorAll('.challenge-form input, .challenge-form select'))
      .forEach(function(el) {
        showWarning.call(el);
        if (el.tagName === 'SELECT') checkSelectValid.call(el);
      });

    updateCardValidity();

  });

  document.querySelector('.challenge-form form').addEventListener('submit', function() {
    if (!this.checkValidity() || !checkCardValid()) {
      return false;
    } else {
      alert('Congrats! Form is valid and can be submitted.');
      return false;
    }
  });

}

document.addEventListener('DOMContentLoaded', function(event) {
  addSelectVals();
  addBlurEvent();
  enableCreditCardValidation();
  enableSelectValidation();
  addSubmitListener();
});
