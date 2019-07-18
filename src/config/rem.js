(function (win, doc) {
  var viewport = doc.querySelector("meta[name=viewport]");  
  //下面是根据设备像素设置viewport  
//   if (win.devicePixelRatio == 1) {  
//       viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');  
//   }  
//   if (win.devicePixelRatio == 2) {  
//       viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');  
//   }  
//   if (win.devicePixelRatio == 3) {  
//       viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');  
//   }  
  function change() {
    doc.documentElement.style.fontSize = doc.documentElement.clientWidth / 7.5 + 'px';
  }
  change();
  win.addEventListener('resize', change, false);
})(window, document);