function step1 (phase, amplitude, mx, my) {
  stroke(255, 255, 255);
  let frequence = 0.03;
  if(my > height * .3 && my < height * .7)
    x = mx;
  else
    x = -200;
  
  beginShape();
  for (var i = 0; i < width + 4; i+=4) {
    if(i >= x - 200 && i < x){
      let y = height * .5;
      y += abs((i-x + 200)/100)*sin(i * frequence - phase) * amplitude;
      vertex(i, y);
    }
    else if(i <= x + 200 && i >= x){
      let y = height * 0.5;
      y += abs((200 + x-i)/100)*sin(i * frequence - phase) * amplitude;
      vertex(i, y);
    }
    else{
      let y = height * 0.5;
      vertex(i, y);
    }
    
  }
  endShape();

  amplitude = height*0.1;
  beginShape();
  for (var i = 0; i < width + 4; i+=4) {
    if(i >= x - 200 && i < x){
      let y = height * .5;
      y += abs((i-x + 200)/100)*sin(i * frequence - phase) * amplitude;
      vertex(i, y);
    }
    else if(i <= x + 200 && i >= x){
      let y = height * 0.5;
      y += abs((200 + x-i)/100)*sin(i * frequence - phase) * amplitude;
      vertex(i, y);
    }
    else{
      let y = height * 0.5;
      vertex(i, y);
    }
    
  }
  endShape();

  
}

function setup () {
  let size = min(windowWidth, windowHeight) * 0.96;
  size = floor(size);
  var canvas = createCanvas(windowWidth, windowHeight/2);
  //noiseSeed(random(100));
  canvas.parent("sketch-div");
  mouseY = height/2;
  background(122);
  noFill();
}

function draw () {
  clear();
  const phase = millis() * 0.02;
  const amplitude = height * 0.2;
  
  window['step1'](phase, amplitude, mouseX, mouseY);
  
  
}



