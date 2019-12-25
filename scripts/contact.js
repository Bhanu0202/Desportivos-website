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
    clip = document.querySelector("#clip-" + i + " circle");
    clip.setAttribute("cx", c.x);
    clip.setAttribute("cy", c.y);
    console.log("ClipX = ", clip.getAttribute("cx"), " X = ", el.clientX);
    console.log("Y = ", el.clientY);
    console.log(i);
  });
});
