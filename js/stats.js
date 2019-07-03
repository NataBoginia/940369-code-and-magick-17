'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP_X = 55;
var GAP_Y = 20;
var FONT_GAP = 20;
var TITLE_GAP = 10;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var cloudGapWidth = CLOUD_WIDTH / 10;
var cloudGapHeight = CLOUD_HEIGHT / 10;

/**
  * Отрисовывает облако определенной формы по начальным координатам и заливает цветом
  *
  * @param {Object} ctx - Контекст рендеринга для canvas
  * @param {number} x - Начальная x-координата облака
  * @param {number} y - Начальная y-координата облака
  * @param {string} color - Цвет заливки облака
  */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x + cloudGapWidth, y);
  ctx.lineTo(x + CLOUD_WIDTH - cloudGapWidth, y);
  ctx.lineTo(x + CLOUD_WIDTH, y + cloudGapHeight);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - cloudGapHeight);
  ctx.lineTo(x + CLOUD_WIDTH - cloudGapWidth, y + CLOUD_HEIGHT);
  ctx.lineTo(x + cloudGapWidth, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT - cloudGapHeight);
  ctx.lineTo(x, y + cloudGapHeight);
  ctx.closePath();
  ctx.fill();
};

/**
  * Возвращает максимальный элемент из входящего массива
  *
  * @param {number[]} arr - Массив чисел
  * @return {number} Максимальный элемент массива
  */
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/**
  * Отрисовывает статистику игроков на попапе-облаке в виде вертикальной гистограммы
  *
  * @param {Object} ctx - Контекст рендеринга для canvas
  * @param {string[]} names - Массив имен игроков
  * @param {number[]} times -  Массив результатов игроков, содержит время прохождения уровня в мс
  */
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'top';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_X, CLOUD_Y + GAP_Y);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_X, CLOUD_Y + GAP_Y + FONT_GAP);

  var maxTime = getMaxElement(times);
  var statisticsY = CLOUD_Y + GAP_Y + FONT_GAP * 2 + TITLE_GAP;

  for (var i = 0; i < times.length; i++) {
    var color = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : ('rgba(0, 0, 255,' + Math.random() + ')');
    var curX = CLOUD_X + GAP_X + (BAR_WIDTH + BAR_GAP) * i;
    var curBarHeight = times[i] / maxTime * BAR_MAX_HEIGHT;

    ctx.textBaseline = 'top';
    ctx.fillStyle = color;
    ctx.fillRect(curX, statisticsY + FONT_GAP + (BAR_MAX_HEIGHT - curBarHeight), BAR_WIDTH, curBarHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), curX, statisticsY);
    ctx.textBaseline = 'bottom';
    ctx.fillText(names[i], curX, statisticsY + FONT_GAP + BAR_MAX_HEIGHT + FONT_GAP);
  }
};
