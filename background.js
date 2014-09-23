chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'bounds': {
      'width': 1280,
      'height': 720
    }},
    onWindowCreated
  );
});

var appWin;

function onWindowCreated(win) {
  appWin = win;
  // Resize the webview when the window resizes.
  appWin.onBoundsChanged.addListener(onBoundsChanges);
  // Initialize the webview size once on launch.
  onBoundsChanges();
}

function onBoundsChanges() {
  var view = appWin.contentWindow.document.querySelector('webview#theWebView');
  if (null === view)
  {
    setTimeout(onBoundsChanges, 50); //Crude, but it works
    return;
  }
  var bounds = appWin.getBounds();
  view.style.height = bounds.height + 'px';
  view.style.width = bounds.width + 'px';
}