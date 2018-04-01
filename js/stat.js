'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Рисуем облако

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

  ctx.beginPath();
  ctx.moveTo(110, 50);
  ctx.quadraticCurveTo(180, 0, 250, 50);
  ctx.quadraticCurveTo(320, 0, 390, 50);
  ctx.quadraticCurveTo(460, 0, 530, 50);

  ctx.lineTo(530, 260);

  ctx.quadraticCurveTo(477.5, 310, 425, 260);
  ctx.quadraticCurveTo(372.5, 310, 320, 260);
  ctx.quadraticCurveTo(267.5, 310, 215, 260);
  ctx.quadraticCurveTo(162.5, 310, 110, 260);

  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgb(255, 255, 255)';

  ctx.beginPath();
  ctx.moveTo(100, 40);
  ctx.quadraticCurveTo(170, -10, 240, 40);
  ctx.quadraticCurveTo(310, -10, 380, 40);
  ctx.quadraticCurveTo(450, -10, 520, 40);

  ctx.lineTo(520, 250);

  ctx.quadraticCurveTo(467.5, 300, 415, 250);
  ctx.quadraticCurveTo(362.5, 300, 310, 250);
  ctx.quadraticCurveTo(257.5, 300, 205, 250);
  ctx.quadraticCurveTo(152.5, 300, 100, 250);

  ctx.closePath();
  ctx.fill();
};
