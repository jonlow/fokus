(function () {

  var active = document.createElement('pre');
  
  document.body.appendChild(active);

  active.tabindex = -1;
  
  with (active.style) { // warning: `with` I know what I'm doing!
    position = 'fixed';
    padding = '2px';
    bottom = right = '20px';
    margin = 0;
    fontSize = 12;
    color = '#fff';
    background = '#aaa';
    wordWrap = 'break-word';
    maxWidth = '95%';
  }

  var lastActive = null;
  var showActive = function () {

    var el = document.activeElement;

    if(el) {
	    var html = '';
	    var attrs = el.attributes;
	    var i = 0;

	    if (el !== lastActive && el !== active) {
	      for (; i < attrs.length; i++) {
	        
          if(attrs[i].name.indexOf('on') != 0)
            html += ' ' + attrs[i].name + '="' + attrs[i].value + '"';
	      }

        var sOutput = '<' + el.nodeName.toLowerCase() + html + '>' + truncate(el.textContent.trim());

	      if('textContent' in document.body) {
	      	active.textContent = sOutput;
        } else {
          active.innerText = sOutput; //Support browsers <= IE8
        }

	      lastActive = el;
	    }

	    requestAnimationFrame(showActive);
  	} else {
  		requestAnimationFrame(showActive);
  	}
  };

  // Truncate Elipsis
  var truncate = function(string) {
     if (string.length > 20)
        return string.substring(0,20)+' ...';
     else
        return string;
  };

  // Old IE Trim Polyfill
  if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, ''); 
    }
  }

  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  (function() {
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
          window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                     || window[vendors[x]+'CancelRequestAnimationFrame'];
      }
   
      if (!window.requestAnimationFrame)
          window.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                timeToCall);
              lastTime = currTime + timeToCall;
              return id;
          };
   
      if (!window.cancelAnimationFrame)
          window.cancelAnimationFrame = function(id) {
              clearTimeout(id);
          };
  }());

	  showActive();
})();