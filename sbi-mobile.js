(function() {
  window.__sbi = window.__sbi || (function() {
    var SERVER = 'www.google.com',
      body = document.body,
      cancelId = 'sbi-cancel-' + (new Date().getTime()),
      onClick = function(event) {
        var target = event.target, src;
        if (target.nodeType === 1 && target.nodeName.toLowerCase() === 'img' &&
            (src = target.src).indexOf('data:') !== 0) {
          window.open('http://' + SERVER + '/searchbyimage?image_url=' + encodeURIComponent(src), 'sbi');
          finish();
        }
        return true;
      },
      panel = (function() {
        var container = document.createElement('div');
        container.innerHTML =
          '<div style="display:none;position:fixed;left:0;bottom:0;width:100%;padding:10px;background:#fcf8e3;">画像をタップしてください。<button id="' + cancelId + '">キャンセル</button></div>';
        return container.firstChild;
      })(),
      start = function() {
        body.addEventListener('click', onClick, false);
        panel.style.display = 'block';
      },
      finish = function() {
        body.removeEventListener('click', onClick, false);
        panel.style.display = 'none';
      };

    body.appendChild(panel);
    document.getElementById(cancelId).addEventListener('click', function() {
      finish();
      return true;
    }, false);

    return {
      start: start
    };
  })();

  window.__sbi.start();
})();
