'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Рисуем облако

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

  ctx.beginPath();
  ctx.moveTo(110, 50);
  ctx.quadraticCurveTo(180, 0, 250, 50);
  ctx.quadraticCurveTo(320, 0, 390, 50);
  ctx.quadraticCurveTo(460, 0, 530, 50);

  ctx.lineTo(530, 290);

  ctx.quadraticCurveTo(477.5, 310, 425, 290);
  ctx.quadraticCurveTo(372.5, 310, 320, 290);
  ctx.quadraticCurveTo(267.5, 310, 215, 290);
  ctx.quadraticCurveTo(162.5, 310, 110, 290);

  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgb(255, 255, 255)';

  ctx.beginPath();
  ctx.moveTo(100, 40);
  ctx.quadraticCurveTo(170, -10, 240, 40);
  ctx.quadraticCurveTo(310, -10, 380, 40);
  ctx.quadraticCurveTo(450, -10, 520, 40);

  ctx.lineTo(520, 280);

  ctx.quadraticCurveTo(467.5, 300, 415, 280);
  ctx.quadraticCurveTo(362.5, 300, 310, 280);
  ctx.quadraticCurveTo(257.5, 300, 205, 280);
  ctx.quadraticCurveTo(152.5, 300, 100, 280);

  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 60);
  ctx.fillText('Список результатов:', 120, 80);

  var height = 0;
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
    height = Math.round(times[i] / maxTime * 150);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = getRandomInt(0, 100);
      ctx.fillStyle = 'hsl(235, ' + saturation + '%, 27%)';
    }

    ctx.fillRect(150 + i * 90, 260 - height, 40, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[i], 150 + 90 * i, 275);
    times[i] = Math.round(times[i]);
    ctx.fillText(times[i], 150 + 90 * i, 250 - height, 40);
  }
};
