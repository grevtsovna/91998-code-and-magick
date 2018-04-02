'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Рисуем облако

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

  var renderCloud = function (ctx, x, y, color) {
    var currentX = x;
    var currentY = y;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);

    // Рисуем верхнюю кромку облака

    for (var i = 1; i <= CLOUD_TOP_RINGLETS; i++) {
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

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 50);
  ctx.fillText('Список результатов:', 120, 70);

  var height = [];
  var maxTime = Math.round(times[0]);

  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = Math.round(times[i]);
    }
  }

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  for (i = 0; i < times.length; i++) {
    height[i] = Math.round(times[i] / maxTime * 150);
  }

  var intervals = [];
  var heightStart = [];

  for (i = 0; i < height.length; i++) {
    heightStart[i] = 0;
    if (names[i] === 'Вы') {
      var fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = getRandomInt(0, 100);
      fillStyle = 'hsl(235, ' + saturation + '%, 27%)';
    }
    intervals[i] = setInterval(function (j, fill) {
      ctx.fillStyle = fill;
      ctx.fillRect(165 + 90 * j, 250, 40, -heightStart[j]);

      if (heightStart[j] >= height[j]) {
        clearInterval(intervals[j]);
      }

      heightStart[j]++;
    }, 4, i, fillStyle);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[i], 165 + 90 * i, 265);
    times[i] = Math.round(times[i]);
    ctx.fillText(times[i], 165 + 90 * i, 245 - height[i], 40);
  }
};
