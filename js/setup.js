'use strict';

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
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

var applySetupEventHandlers = function () {
  var setupWindow = document.querySelector('.setup');
  var wizards = getWizardsData(4);
  var similarWizardList = setupWindow.querySelector('.setup-similar');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  var openSetupButton = document.querySelector('.setup-open');
  var closeSetupButton = setupWindow.querySelector('.setup-close');
  var setupUserNameInput = setupWindow.querySelector('.setup-user-name');
  var wizardEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setupWindow.querySelector('.setup-fireball-wrap');
  var wizardEyesColorInput = setupWindow.querySelector('input[name=eyes-color');
  var wizardFireballColorInput = setupWindow.querySelector('input[name=fireball-color');
  var openSetupIcon = openSetupButton.querySelector('.setup-open-icon');

  var openSetupWindow = function () {
    setupWindow.classList.remove('hidden');

    closeSetupButton.addEventListener('click', function () {
      closeSetupWindow();
    });
    closeSetupButton.addEventListener('keydown', onCloseSetupButtonEnterPress);
    setupUserNameInput.addEventListener('keydown', onSetupUserNameKeydown);
    document.addEventListener('keydown', onPopupKeyPress);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    wizardFireball.addEventListener('click', onFireballClick);
  };

  var closeSetupWindow = function () {
    setupWindow.classList.add('hidden');
    setupWindow.style.top = '';
    setupWindow.style.left = '';

    closeSetupButton.removeEventListener('keydown', onCloseSetupButtonEnterPress);
    setupUserNameInput.removeEventListener('keydown', onSetupUserNameKeydown);
    document.removeEventListener('keydown', onPopupKeyPress);
    wizardEyes.removeEventListener('click', onWizardEyesClick);
    wizardFireball.removeEventListener('click', onFireballClick);
  };

  var onPopupKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSetupWindow();
    }
  };

  var onSetupUserNameKeydown = function (evt) {
    evt.stopPropagation();
  };

  var onCloseSetupButtonEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeSetupWindow();
    }
  };

  var onWizardEyesClick = function () {
    var newEyesColor = getRandomArrayElement(eyesColors);
    wizardEyesColorInput.value = newEyesColor;
    wizardEyes.style.fill = newEyesColor;
  };

  var onFireballClick = function () {
    var newFireballColor = getRandomArrayElement(FIREBALL_COLORS);
    wizardFireballColorInput.value = newFireballColor;
    wizardFireball.style.backgroundColor = newFireballColor;
  };

  var onOpenSetupIconKeydown = function (evt) {
    if (evt.keyCode === 13) {
      openSetupWindow();
    }
  };

  // Добавляем всех похожих волшебников во фрагмент
  for (var i = 0; i < wizards.length; i++) {
    var wizard = renderWizard(wizards[i], similarWizardTemplate);
    fragment.appendChild(wizard);

    similarWizardList.querySelector('.setup-similar-list').appendChild(fragment);
    similarWizardList.classList.remove('hidden');
  }

  openSetupButton.addEventListener('click', openSetupWindow);
  openSetupIcon.addEventListener('keydown', onOpenSetupIconKeydown);
};

applySetupEventHandlers();

(function () {
  var draggedItem = null;
  var shopEl = document.querySelector('.setup-artifacts-shop');
  var activeArtifactsEl = document.querySelector('.setup-artifacts');

  shopEl.addEventListener('dragstart', function(evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      activeArtifactsEl.style.outline = '2px dashed red';
    }
  });
})();
