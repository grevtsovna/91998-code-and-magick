'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Рисуем облако

  

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

  ctx.beginPath();
  ctx.moveTo(110, 40);
  ctx.quadraticCurveTo(180, 0, 250, 40);
  ctx.quadraticCurveTo(320, 0, 390, 40);
  ctx.quadraticCurveTo(460, 0, 530, 40);

  ctx.lineTo(530, 290);

  ctx.quadraticCurveTo(477.5, 310, 425, 290);
  ctx.quadraticCurveTo(372.5, 310, 320, 290);
  ctx.quadraticCurveTo(267.5, 310, 215, 290);
  ctx.quadraticCurveTo(162.5, 310, 110, 290);

  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgb(255, 255, 255)';

  ctx.beginPath();
  ctx.moveTo(100, 30);
  ctx.quadraticCurveTo(170, -10, 240, 30);
  ctx.quadraticCurveTo(310, -10, 380, 30);
  ctx.quadraticCurveTo(450, -10, 520, 30);

  ctx.lineTo(520, 280);

  ctx.quadraticCurveTo(467.5, 300, 415, 280);
  ctx.quadraticCurveTo(362.5, 300, 310, 280);
  ctx.quadraticCurveTo(257.5, 300, 205, 280);
  ctx.quadraticCurveTo(152.5, 300, 100, 280);

  ctx.closePath();
  ctx.fill();

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
