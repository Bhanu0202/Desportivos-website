$(document).ready(() => {
  var t1 = new TweenMax();
  t1.to("#scramble", {
    duration: 3,
    scrambleText: {
      chars: "upperCase",
      revealDelay: 0.5
    }
  });
});
