'use strict';

document.querySelector('.setup').classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomArrayElement = function (array) {
  return array[window.getRandomInt(0, array.length - 1)];
};

var getWizardsData = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    var wizard = {
      name: getRandomArrayElement(names) + ' ' + getRandomArrayElement(surnames),
      coatColor: getRandomArrayElement(coatColors),
      eyesColor: getRandomArrayElement(eyesColors)
    };
    wizards.push(wizard);
  }

  return wizards;
};

getWizardsData(4);
