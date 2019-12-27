
$(document).ready(function(){
  $(this).scrollTop(0);
});

// $(document).on("mousemove", function(e) { 
//     var $magic = $("#magic"),
//       magicWHalf = $magic.width() / 2;
//     $magic.css({"left": e.pageX - magicWHalf, "top": e.pageY - magicWHalf});
//   });


//Basic JS Operations
var JS = {
  createElement: function (params) {
    var el = document.createElement(params.type),
    i;

    if (params.classes) {
      for (i = 0; i < params.classes.length; i += 1) {
        el.classList.add(params.classes[i]);
      }
    }

    if (params.styles) {
      for (i = 0; i < params.styles.length; i += 1) {
        el.style[params.styles[i][0]] = params.styles[i][1];
      }
    }

    if (params.parent) {
      params.parent.appendChild(el);
    }
    return el;
  },

  class: function (params) {
    var els = params.parent.querySelectorAll(params.selector),
    e;

    for (e = 0; e < els.length; e += 1) {
      if (params.mode === 'remove') {
        els[e].classList.remove(params.className);
      } else if (params.mode === 'add') {
        els[e].classList.add(params.className);
      }
    }
  }
};

// Individual Digit
var Digit = function (params) {
  var current,
  topHalfWrapper,
  bottomHalfWrapper,
  digitWrapper,
  ripple,
  interval;

  function createDigit(no) {
    var topHalf,
    bottomHalf;

    topHalf = JS.createElement({
      parent: topHalfWrapper,
      type: 'div',
      classes: ['no-' + no, 'top-half'],
      styles: [
      ['webkitTransition', 'all ' + params.animationDelay + ' linear'],
      ['MozTransition', 'all ' + params.animationDelay + ' linear']
      ]
    });

    bottomHalf = JS.createElement({
      parent: bottomHalfWrapper,
      type: 'div',
      classes: ['no-' + no, 'bottom-half'],
      styles: [
      ['zIndex', 10 - no],
      ['webkitTransition', 'all ' + params.animationDelay + ' linear'],
      ['webkitTransitionDelay', params.animationDelay],
      ['MozTransition', 'all ' + params.animationDelay + ' linear'],
      ['MozTransitionDelay', params.animationDelay]
      ]
    });

    bottomHalf.innerHTML = no;
    topHalf.innerHTML = no;

    if (no === params.start) {
      topHalf.classList.add('show');
      bottomHalf.classList.add('show');
    }
  }

  function bottomHalfZeroZindex(i) {
    if (i === 0) {
      digitWrapper.querySelector('.bottom-half.no-' + getMax()).style.zIndex = 999;
    }
  }

  function tickTock() {
    if (current === 0) {
      digitWrapper.querySelector('.bottom-half.no-' + getMax()).style.zIndex = 1;
    }

    // Animate top half
    JS.class({ parent: digitWrapper, selector: '.top-half.no-' + current, className: 'roll-over', mode: 'add' });

    //Next cycle
    current = current === 0 ? getMax() : --current;

    // Finish animation
    JS.class({ parent: digitWrapper, selector: '.no-' + current, className: 'show', mode: 'add' });

  }

  function build() {
    var d;

    params.max = params.max || 9;
    params.delay = params.delay || 1000;
    params.first = params.first || false;
    params.start = params.start >= 0 ? params.start : params.max;
    params.group = params.group || false;
    params.play = params.play || false;
    params.animationDelay = params.animationDelay || '.20s';
    params.name = params.name  || [];
    params.offset = params.offset || 0;

    params.name.push('digit');
    current = params.start;

    digitWrapper = JS.createElement({ type: 'div', classes: params.name });
    topHalfWrapper = JS.createElement({ parent: digitWrapper, type: 'div', classes: ['top-half-wrapper'] });
    bottomHalfWrapper = JS.createElement({ parent: digitWrapper, type: 'div', classes: ['bottom-half-wrapper'] });

    for (d = 0; d <= 9; d += 1) {
      createDigit(d);
    }

    if (params.first && params.wrapper.childNodes[0]) {
      params.wrapper.insertBefore(digitWrapper, params.wrapper.childNodes[0]);
    } else {
      params.wrapper.appendChild(digitWrapper);
    }

    bottomHalfZeroZindex(params.start);
  }

  this.flip = function (forceValue) {
    if (forceValue || forceValue === 0) {

      interval = setInterval(function() { 
        if (current != forceValue) {
          tickTock(); 
        } else {
          clearInterval(interval);
        }
      }, params.delay);

    } else {
      tickTock();
    }
  }

  function animate() {
    if (params.play) {
      setTimeout(function () {
        interval = setInterval(function () { 
          tickTock(); 
        }, params.delay);
      }, params.offset);
    }
  }

  build();
  animate();
}


// Main Function
var Digits = function (params) {  
  var digits = [],
  classes = {
    main: 'digits',
    countdown: 'countdown',
    statistics: 'statistics'
  };    

  this.changeValue = function(newValue) {
    var p = digits.length - 1;
    newValue = newValue && newValue.toString() || '0';

    // Set new value
    for (var d = newValue.length - 1; d >= 0; d--) {
      if (digits[p]) {
        digits[p].flip(newValue[d]);
      } else {
        digits = digits.reverse();
        digits.push(new Digit({ name: ['statistic', 'statistic-' + (d + 1)], first: true, wrapper: params.wrapper, start: parseInt(newValue[d]), delay: 250, animationDelay: '.08s' }));
        digits = digits.reverse();
      }

      p--;
    }
  }

  function statistics() {

    params.value = params.value.toString();

    for (var d = 0; d< params.value.length; d++) {
      digits.push(new Digit({ name: ['statistic', 'statistic-' + (d + 1)], wrapper: params.wrapper, start: parseInt(params.value[d]), delay: 250, animationDelay: '.08s' }));
    }
  }

  
  function init() {
    params.wrapper = params.wrapper && document.querySelector(params.wrapper);
    params.mode = params.mode || 'countdown';
    params.labels = params.labels || false;

      // if (!params.wrapper) {
      //   throw Error('Missing parameters');
      // } else {
        params.wrapper.innerHTML = '';
        params.wrapper = JS.createElement({ parent: params.wrapper, type: 'div', classes: [classes.main] });
        
    // Main Class
    params.wrapper.classList.add(classes.main);
    params.wrapper.classList.add(classes.statistics);
    statistics();
  }

  init();
}


var stats1, stats2, stats3;

// Create Digits
function init () {
  stats1 = new Digits({ wrapper: '#stats1', mode: 'statistics', value: 9999 }); 
  stats2 = new Digits({ wrapper: '#stats2', mode: 'statistics', value: 999 }); 
  stats3 = new Digits({ wrapper: '#stats3', mode: 'statistics', value: 99 }); 
  
  // Change value after 2 seconds  
  function change () {
    stats1.changeValue(2000);
    stats2.changeValue(100);
    stats3.changeValue(20);
  }
  change();
}

init();

