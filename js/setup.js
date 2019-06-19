'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_QUANTITY = 4;

/**
  * Создает тестовый массив волшебников определенной длины,
  * параметры каждого волшебника выбираются случайным образом из набора тестовых данных
  *
  * @param {number} quantity - Количество волшебников (элементов массива)
  * @return {Object[]} Массив волшебников
  */
var createWizards = function (quantity) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    var wizard = {
      name: WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)],
      coatColor: COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)],
      eyesColor: EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)]
    };
    wizards[i] = wizard;
  }

  return wizards;
};

/**
  * Создает DOM-элемент для волшебника по шаблону
  *
  * @param {Object} wizard - Объект волшебника
  * @param {Object} template - DOM-элемент шаблона разметки
  * @return {Object} DOM-элемент волшебника
  */
var renderWizard = function (wizard, template) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
  * Возвращает DOM-фрагмент, наполненный DOM-элементами всех волшебников
  *
  * @param {Object[]} wizards - Массив объектов волшебников
  * @param {Object} template - DOM-элемент шаблона разметки
  * @return {Object} DOM-фрагмент
  */
var createWizardsFragment = function (wizards, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], template));
  }

  return fragment;
};

var wizards = createWizards(WIZARDS_QUANTITY);

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

similarListElement.appendChild(createWizardsFragment(wizards, similarWizardTemplate));

document.querySelector('.setup-similar').classList.remove('hidden');
