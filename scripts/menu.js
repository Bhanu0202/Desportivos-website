var cancelFollow = false;

// decides whether to follow the link or cancel it
$(".demo a").click(function(e) {
  if (cancelFollow) {
    cancelFollow = false;
    e.stopImmediatePropagation();
    return false;
  }
  return true;
});

$("div.demo").on("dragstart", "a", function() {
  return false;
});

function resize() {

  if ($(window).width() >= 650) {
    $('div.demo').addClass('marquee');
  } 
  else {
    $('div.demo').removeClass('marquee');
  }

  $(".marquee")
  .marquee({
    duration: 7000,
    delayBeforeStart: 0,
    direction: "left",
    duplicated: true
  })
  .dblclick(function() {
    $(this).marquee("pause");
  })
  .mousemove(function(event) {
    if ($(this).data("drag") == true) {
      this.scrollLeft =
      $(this).data("scrollX") + ($(this).data("x") - event.clientX);
      cancelFollow = true;
    }
  })
  .mousedown(function(event) {
    $(this)
    .data("drag", true)
    .data("x", event.clientX)
    .data("scrollX", this.scrollLeft);
  })
  .mouseup(function() {
    $(this).data("drag", false);
  });

};
$(document).ready( function() {
  resize();
});

$(document).resize( function() {
  resize();
});


$("[data-curtain-menu-button]").click(function() {
  $("body").toggleClass("curtain-menu-open");
});

$(document).on("mousemove", function(e) {
  var $magic = $("#magicm"),
  magicWHalf = $magic.width() / 2;
  $magic.css({ left: e.pageX - magicWHalf, top: e.pageY - magicWHalf });
});

$(".check-out").mouseenter(function() {
  var $magic = $("#magicm");
  $magic.removeClass("magicm");
  $magic.addClass("magics");
});

$(".check-out").mouseleave(function() {
  var $magic = $("#magicm");
  $magic.removeClass("magics");
  $magic.addClass("magicm");
});

$(".button").hover(function() {
  $(this).toggleClass("is-active");
  var $magic = $("#magicm");
  $magic.toggleClass("magics");
  $magic.toggleClass("magicm");
});
