
//hack to get webpack devserver to watch index.html

require('./scss/styles.scss');
require('./index.html');

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

  addSelectVals();

  // document.querySelector('.js-submit').addEventListener('click', function(){
  //   alert('form submitted!');
  // })


});
