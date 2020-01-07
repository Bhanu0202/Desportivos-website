let pt = document.querySelector("svg").createSVGPoint();
let clip, c, svg;
const items = document.getElementsByClassName("item");
console.log(items);
[...items].forEach((e, i) => {
  e.addEventListener("mousemove", el => {
    svg = e.querySelector("svg");
    pt.x = el.clientX;
    pt.y = el.clientY;
    c = pt.matrixTransform(svg.getScreenCTM().inverse());
    if (i === 6) clip = document.querySelector("#clip-" + 100 + " circle");
    else if (i == 7) clip = document.querySelector("#clip-" + 101 + " circle");
    else if (i > 7)
      clip = document.querySelector("#clip-" + (i - 1) + " circle");
    else clip = document.querySelector("#clip-" + (i + 1) + " circle");
    clip.setAttribute("cx", c.x);
    clip.setAttribute("cy", c.y);
  });
});
