'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

// Функция, возвращающая случайный элемент массива
var getRandomArrayElement = function (array) {
  return array[window.getRandomInt(0, array.length - 1)];
};

// Функция, генерирующая массив с определенным количеством объектов (волшебников)
var getWizardsData = function (quanity) {
  var wizards = [];
  for (var i = 0; i < quanity; i++) {
    wizards[i] = {
      name: getRandomArrayElement(names) + ' ' + getRandomArrayElement(surnames),
      coatColor: getRandomArrayElement(coatColors),
      eyesColor: getRandomArrayElement(eyesColors)
    };
  }

  return wizards;
};

var wizards = getWizardsData(4);

var similarWizardList = setupWindow.querySelector('.setup-similar');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

// Функция отрисовки волшебника
var renderWizard = function (wizardData) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

  return wizardElement;
};

// Добавляем всех похожих волшебников во фрагмент
for (var i = 0; i < wizards.length; i++) {
  var wizard = renderWizard(wizards[i]);
  fragment.appendChild(wizard);
}

similarWizardList.querySelector('.setup-similar-list').appendChild(fragment);
similarWizardList.classList.remove('hidden');
