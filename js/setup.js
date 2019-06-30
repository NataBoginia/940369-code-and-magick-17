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
// userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

similarListElement.appendChild(createWizardsFragment(wizards, similarWizardTemplate));

document.querySelector('.setup-similar').classList.remove('hidden');


// Учебный проект: одеть Надежду
/* Открытие/закрытие окна настройки персонажа:

Окно .setup должно открываться по нажатию на блок .setup-open. Открытие окна производится удалением класса hidden у блока

Окно .setup должно закрываться по нажатию на элемент .setup-close, расположенный внутри окна

Добавить обработчики для альтернативного ввода с клавиатуры keydown для кнопок открытия/закрытия диалога настройки персонажа:

Когда иконка пользователя в фокусе .setup-open-icon, то окно настройки персонажа должно открываться по нажатию кнопки ENTER.
Не забудьте добавить  tabindex="0" для иконки пользователя, чтобы она фокусировалась;
Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог.
Если фокус находится на форме ввода имени, то окно закрываться не должно;
Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога;
Если диалог открыт, нажатие на кнопку «Сохранить» приводит к отправке формы;
Если диалог открыт и фокус находится на кнопке «Сохранить», нажатие на ENTER приводит к отправке формы;
*/

var ESC_CODE = 27;
var ENTER_CODE = 13;

/**
  * Показывает диалог персонажа, добавляет обработчик события на кнопку закрытия диалога
  *
  */
var openDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onDialogEscPress);
};

/**
  * Скрывает диалог персонажа, удаляет обработчик события на кнопке закрытия диалога
  *
  */
var closeDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onDialogEscPress);
};

/**
  * Скрывает диалог персонажа по кнопке Esc
  *
  */
var onDialogEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    userDialog.classList.add('hidden');
  }
};

var setupOpenElement = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupCloseElement = userDialog.querySelector('.setup-close');


setupOpenElement.addEventListener('click', function () {
  openDialog();
});

setupCloseElement.addEventListener('click', function () {
  closeDialog();
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    openDialog();
  }
});
