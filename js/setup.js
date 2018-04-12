'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция, перемешивающая массив
var shuffleArray = function (array) {
  var shuffledArray = array.slice();
  var counter = shuffledArray.length;

  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter--;

    var swap = shuffledArray[counter];
    shuffledArray[counter] = shuffledArray[index];
    shuffledArray[index] = swap;
  }

  return shuffledArray;
};

// Функция, подготавливающая данные для создания волшебников
var prepareData = function (quanity, array) {
  var preparedArr = array.slice();

  if (quanity > preparedArr.length) {
    var diff = Math.ceil((quanity - preparedArr.length) / preparedArr.length);
    var preparedArrCopy = preparedArr.slice();
    for (var i = 0; i < diff; i++) {
      preparedArr = preparedArr.concat(preparedArrCopy);
    }
  }

  return shuffleArray(preparedArr);
};

// Функция, генерирующая массив с определенным количеством объектов (волшебников)
var getWizardsData = function (quanity) {
  var preparedNames = prepareData(quanity, names);
  var preparedSurnames = prepareData(quanity, surnames);
  var preparedCoatColors = prepareData(quanity, coatColors);
  var preparedEyesColors = prepareData(quanity, eyesColors);

  var wizards = [];
  for (var i = 0; i < quanity; i++) {
    wizards[i] = {
      name: preparedNames[i] + ' ' + preparedSurnames[i],
      coatColor: preparedCoatColors[i],
      eyesColor: preparedEyesColors[i]
    };
  }

  return wizards;
};

// Функция отрисовки волшебника
var renderWizard = function (wizardData, similarWizardTemplate) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

  return wizardElement;
};

// Функция, аозвращающая случайный элемент массива
var getRandomArrayElement = function (array) {
  return array[window.getRandomInt(0, array.length - 1)];
};

var showSetup = function () {
  var FIREBALL_COLORS = ['##ee4830', '#30a8ee', '#30a8ee', '#e848d5', '#e6e848'];

  var setupWindow = document.querySelector('.setup');
  var wizards = getWizardsData(4);
  var similarWizardList = setupWindow.querySelector('.setup-similar');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  var openSetupButton = document.querySelector('.setup-open');
  var closeSetupButton = setupWindow.querySelector('.setup-close');
  var setupUserNameButton = setupWindow.querySelector('.setup-user-name');
  var wizardEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setupWindow.querySelector('.setup-fireball-wrap');

  var openSetupWindow = function () {
    setupWindow.classList.remove('hidden');

    closeSetupButton.addEventListener('click', function () {
      closeSetupWindow();
    });
    closeSetupButton.addEventListener('keydown', onCloseSetupButtonEscPress);
    setupUserNameButton.addEventListener('keydown', onSetupUserNameFocus);
    document.addEventListener('keydown', onPopupEscPress);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    wizardFireball.addEventListener('click', onFireballClick);
  };

  var closeSetupWindow = function () {
    setupWindow.classList.add('hidden');
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeSetupWindow();
    }
  };

  var onSetupUserNameFocus = function (evt) {
    evt.stopPropagation();
  };

  var onCloseSetupButtonEscPress = function (evt) {
    if (evt.keyCode === 13) {
      closeSetupWindow();
    }
  };

  var onWizardEyesClick = function () {
    wizardEyes.style.fill = getRandomArrayElement(eyesColors);
  };

  var onFireballClick = function () {
    wizardFireball.style.backgroundColor = getRandomArrayElement(FIREBALL_COLORS);
  };

  openSetupButton.addEventListener('click', openSetupWindow);
  openSetupButton.querySelector('.setup-open-icon').addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      openSetupWindow();
    }
  });

  // Добавляем всех похожих волшебников во фрагмент
  for (var i = 0; i < wizards.length; i++) {
    var wizard = renderWizard(wizards[i], similarWizardTemplate);
    fragment.appendChild(wizard);

    similarWizardList.querySelector('.setup-similar-list').appendChild(fragment);
    similarWizardList.classList.remove('hidden');
  }
};

showSetup();
