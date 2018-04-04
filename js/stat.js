'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_TOP_RINGLETS = 3;
var CLOUD_BOTTOM_RINGLETS = 4;
var TOP_RINGLET_WIDTH = CLOUD_WIDTH / CLOUD_TOP_RINGLETS;
var RINGLET_HEIGTH = 20;
var BOTTOM_RINGLET_WIDTH = CLOUD_WIDTH / CLOUD_BOTTOM_RINGLETS;
var CLOUD_X = 100;
var CLOUD_Y = 30;
var GAP = 10;
var PADDING_TOP = 20;
var PADDING_LEFT = 10;
var PADDING_BOTTOM = 20;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var COLUMN_PADDING_LEFT = 55;
var TOP_TEXT_MARGIN = 5;

var renderCloud = function (ctx, x, y, color) {
  var currentX = x;
  var currentY = y;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);

  // Рисуем верхнюю кромку облака

  for (var i = 0; i < CLOUD_TOP_RINGLETS; i++) {
    var ringletTop = currentY - RINGLET_HEIGTH;
    currentX += TOP_RINGLET_WIDTH;
    var ringletMiddle = currentX - TOP_RINGLET_WIDTH / 2;
    ctx.quadraticCurveTo(ringletMiddle, ringletTop, currentX, currentY);
  }

  // Рисуем правый край облака

  currentY += CLOUD_HEIGHT - RINGLET_HEIGTH;
  ctx.lineTo(currentX, currentY);

  // Рисуем нижнюю кромку облака
  for (i = 1; i <= CLOUD_BOTTOM_RINGLETS; i++) {
    var ringletBottom = currentY + RINGLET_HEIGTH;
    currentX -= BOTTOM_RINGLET_WIDTH;
    ringletMiddle = currentX + BOTTOM_RINGLET_WIDTH / 2;
    ctx.quadraticCurveTo(ringletMiddle, ringletBottom, currentX, currentY);
  }

  // Рисуем левый край облака

  currentX = x;
  currentY = y;
  ctx.lineTo(currentX, currentY);

  ctx.closePath();
  ctx.fill();
};

// Функция, возвращающая случайное целое число в интервале [min, max]
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.renderStatistics = function (ctx, names, times) {

  // Рисуем облако c тенью
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + PADDING_LEFT, CLOUD_Y + PADDING_TOP);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING_LEFT, CLOUD_Y + PADDING_TOP * 2);

  var heightOfColumns = [];
  var maxTime = Math.round(times[0]);

  // Находим максимальное значение времени
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = Math.round(times[i]);
    }
  }

  // Рассчитываем высоты колонок
  for (i = 0; i < times.length; i++) {
    heightOfColumns[i] = Math.round(times[i] / maxTime * 150);
  }

  var intervals = [];
  var currentHeightOfEachColumns = [];

  for (i = 0; i < heightOfColumns.length; i++) {
    currentHeightOfEachColumns[i] = 0;

    // Задаем цвет колонок
    if (names[i] === 'Вы') {
      var fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = getRandomInt(0, 100);
      fillStyle = 'hsl(235, ' + saturation + '%, 27%)';
    }

    // Анимируем отрисовку столбцов
    intervals[i] = setInterval(function (j, fill) {
      ctx.fillStyle = fill;
      ctx.fillRect(
          CLOUD_X + COLUMN_PADDING_LEFT + ((COLUMN_WIDTH + COLUMN_GAP) * j),
          CLOUD_HEIGHT - PADDING_BOTTOM,
          COLUMN_WIDTH,
          -currentHeightOfEachColumns[j]
      );

      if (currentHeightOfEachColumns[j] >= heightOfColumns[j]) {
        clearInterval(intervals[j]);
      }

      currentHeightOfEachColumns[j]++;
    }, 4, i, fillStyle);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(
        names[i],
        CLOUD_X + COLUMN_PADDING_LEFT + ((COLUMN_WIDTH + COLUMN_GAP) * i),
        CLOUD_HEIGHT
    );
    times[i] = Math.round(times[i]);
    ctx.fillText(
        times[i],
        CLOUD_X + COLUMN_PADDING_LEFT + ((COLUMN_WIDTH + COLUMN_GAP) * i),
        CLOUD_HEIGHT - PADDING_BOTTOM - TOP_TEXT_MARGIN - heightOfColumns[i],
        COLUMN_WIDTH
    );
  }
};
