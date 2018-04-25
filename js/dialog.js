'use strict';

(function () {
  var setupWindow = document.querySelector('.setup');
  var setupHandle = document.querySelector('.setup-user-pic');

  setupHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      setupWindow.style.top = (setupWindow.offsetTop + shift.y) + 'px';
      setupWindow.style.left = (setupWindow.offsetLeft + shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
