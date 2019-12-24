import eventsContent from "./eventsData.js";

//modal

var body = document.body;
var modal = createModal(document.querySelector("#modal-1"));
var targetClicked = undefined;

//modal animations

function createModal(container) {
  var content = container.querySelector(".modal-content");
  var dialog = container.querySelector(".modal-dialog");
  var polygon = container.querySelector(".modal-polygon");
  var svg = container.querySelector(".modal-svg");

  var point1 = createPoint(45, 45);
  var point2 = createPoint(55, 45);
  var point3 = createPoint(55, 55);
  var point4 = createPoint(45, 55);

  var animation = new TimelineMax({
    onReverseComplete: onReverseComplete,
    onStart: onStart,
    paused: true
  })
    .to(
      point1,
      0.3,
      {
        x: 15,
        y: 30,
        ease: Power4.easeIn
      },
      0
    )
    .to(
      point4,
      0.3,
      {
        x: 5,
        y: 80,
        ease: Power2.easeIn
      },
      "-=0.1"
    )
    .to(point1, 0.3, {
      x: 0,
      y: 0,
      ease: Power3.easeIn
    })
    .to(
      point2,
      0.3,
      {
        x: 100,
        y: 0,
        ease: Power2.easeIn
      },
      "-=0.2"
    )
    .to(point3, 0.3, {
      x: 100,
      y: 100,
      ease: Power2.easeIn
    })
    .to(
      point4,
      0.3,
      {
        x: 0,
        y: 100,
        ease: Power2.easeIn
      },
      "-=0.1"
    )
    .to(
      container,
      1,
      {
        autoAlpha: 1
      },
      0
    )
    .to(content, 1, {
      autoAlpha: 1
    });

  var modal = {
    animation: animation,
    container: container,
    content: content,
    dialog: dialog,
    isOpen: false,
    open: open,
    close: close
  };

  body.removeChild(container);

  function onClick() {
    if (modal.isOpen) {
      close();
    }
  }

  function onStart() {
    body.appendChild(container);
    const targetName = targetClicked.innerHTML;
    console.log(targetName);
    const modalHeader = container.querySelector(".modal-header");
    const modalBody = container.querySelector(".modal-body");
    modalHeader.innerHTML = eventsContent[targetName].header;
    modalBody.innerHTML = eventsContent[targetName].body;
    container.addEventListener("click", onClick);
  }

  function onReverseComplete() {
    container.removeEventListener("click", onClick);
    body.removeChild(container);
  }

  function open() {
    modal.isOpen = true;
    animation.play().timeScale(2);
  }

  function close() {
    modal.isOpen = false;
    animation.reverse().timeScale(2.5);
  }

  function createPoint(x, y) {
    var point = polygon.points.appendItem(svg.createSVGPoint());
    point.x = x || 0;
    point.y = y || 0;
    return point;
  }

  return modal;
}

let timeout, imgto;
const ul = document.getElementById("items");
const li = document.getElementsByTagName("li");
const cap = document.getElementById("event-img");
const ar_li = [...li];
ul.addEventListener("mouseover", e => {
  const el = e.target;
  cap.style.opacity = 0;
  if (el.tagName === "LI") {
    console.log(el);
    clearTimeout(imgto);

    imgto = setTimeout(() => {
      cap.setAttribute("src", `assets/events/${el.innerHTML}.jpg`);
      cap.style.opacity = 1;
    }, 500);
  } else {
    clearTimeout(imgto);
    imgto = setTimeout(() => {
      cap.setAttribute("src", `assets/events/event-1.jpg`);
      cap.style.opacity = 1;
    }, 500);
  }
});
let prevpos = 0;
document.addEventListener("mousemove", e => {
  const pos = ul.getBoundingClientRect().y;
  let direction;
  if (prevpos > pos) direction = "up";
  else direction = "down";
  prevpos = pos;
  ul.style.transform =
    "translateY(" + -(e.clientY - screen.height / 2 + 100) + "px)";

  ar_li.forEach(l => {
    if (direction === "up") l.style.transform = "rotate3d(1, 1, 1, -3deg)";
    if (direction === "down") l.style.transform = "rotate3d(1,1,1,3deg)";
  });
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    ar_li.forEach(l => {
      l.style.transform = "scaleY(1) rotate3d(0, 0, 0, 0)";
    });
  }, 80);
});

ul.addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    targetClicked = e.target;
    modal.open();
  }
});
