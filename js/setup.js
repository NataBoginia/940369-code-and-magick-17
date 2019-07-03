'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_QUANTITY = 4;
var ESC_CODE = 27;
var ENTER_CODE = 13;

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

/**
  * Показывает диалог персонажа, добавляет закрытие диалога по Esc
  */
var openDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onDialogEscPress);
};

/**
  * Скрывает диалог персонажа, удаляет закрытие диалога по Esc
  */
var closeDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onDialogEscPress);
};

/**
  * Скрывает диалог персонажа по кнопке Esc, если фокус не в поле ввода имени
  * @param {Object} evt
  */
var onDialogEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE && evt.target !== setupNameInput) {
    closeDialog();
  }
};

/**
  * Меняет заливку svg-элемента случайный образом из входящего массива цветов, в инпуте возвращает значение цвета
  * @param {Object} element - DOM-элемент, для которого надо поменять цвет
  * @param {Object} input - DOM-элемент поля ввода, для которого нужно прописать значение цвета
  * @param {string[]} colors - Массив возможных цветов
  */

var changeFillColor = function (element, input, colors) {
  var color = colors[Math.floor(Math.random() * colors.length)];
  element.style.fill = color;
  input.value = color;
};

/**
  * Меняет цвет фона элемента случайный образом из входящего массива цветов, в инпуте возвращает значение цвета
  * @param {Object} element - DOM-элемент, для которого надо поменять цвет фона
  * @param {Object} input - DOM-элемент поля ввода, для которого нужно прописать значение цвета
  * @param {string[]} colors - Массив возможных цветов
  */
var changeBackgroundColor = function (element, input, colors) {
  var color = colors[Math.floor(Math.random() * colors.length)];
  element.style.backgroundColor = color;
  input.value = color;
};

// генерация массива случайных волшебников
var wizards = createWizards(WIZARDS_QUANTITY);

// DOM-элемент диалога
var userDialog = document.querySelector('.setup');

// элемент для вывода случайных волшебников в диалоге
var similarListElement = document.querySelector('.setup-similar-list');

// шаблон для элемента случайного волшебника
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// элементы, по которым открывается диалог
var setupOpenElement = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');

// управляющие элементы диалога - кнопка закрытия, поле ввода имени
var setupCloseElement = userDialog.querySelector('.setup-close');
var setupNameInput = userDialog.querySelector('.setup-user-name');

// интерактивные элементы волшебника: мантия, глаза и файербол
var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var wizardCoatInput = userDialog.querySelector('#coat-color');
var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesInput = userDialog.querySelector('#eyes-color');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var wizardFireballInput = userDialog.querySelector('#fireball-color');

// добавление случайных волшебников в окно диалога
similarListElement.appendChild(createWizardsFragment(wizards, similarWizardTemplate));
document.querySelector('.setup-similar').classList.remove('hidden');

/**
  * Открыть диалог по клику на элемент с иконкой пользователя
  */
setupOpenElement.addEventListener('click', function () {
  openDialog();
});

/**
  * Открыть диалог по нажатию Enter на иконке пользователя
  */
setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    openDialog();
  }
});

/**
  * Закрыть диалог по клику на крестик в окне диалога
  */
setupCloseElement.addEventListener('click', function () {
  closeDialog();
});

/**
  * Закрыть диалог по нажатию Enter на крестике в окне диалога
  */
setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closeDialog();
  }
});

/**
  * Добавить обработчики нажатий на мантию, глаза и файербол волшебника
  */
wizardCoat.addEventListener('click', function () {
  changeFillColor(wizardCoat, wizardCoatInput, COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  changeFillColor(wizardEyes, wizardEyesInput, EYES_COLORS);
});

wizardFireball.addEventListener('click', function () {
  changeBackgroundColor(wizardFireball, wizardFireballInput, FIREBALL_COLORS);
});
