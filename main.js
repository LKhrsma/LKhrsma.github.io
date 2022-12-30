let v = [];
let rows = 60, cols = 120;

let canvas;

let pNumSlider, pLenSlider, diameterSlider, pSharpSlider;
let petalNum, pLength, diameter, pSharpness;

let heightSlider, curvatureSlider1, curvatureSlider2;
let flowerHeight, curvature1, curvature2;

let bumpSlider, bumpNumSlider;
let bump, bumpNum;

let pNum, fD, pLen, pSharp;
let fHeight, curve1, curve2;
let b, bNum;

function setup(){
  canvas = createCanvas(1000, 700, WEBGL);
  canvas.class("canvas");

  colorMode(HSB, 500, 100, 100);
  angleMode(DEGREES);
  noStroke();
}

function draw(){
  clear();
  orbitControl(4, 4);

  rotateX(60);

  pNum = 10;
  fD = 200;
  pLen = 30;
  pSharp = 0.2;

  fHeight = 200;
  curve1 = 0.6;
  curve2 = 0.2;

  b = 2.5;
  bNum = 10;

  for(theta = 0; theta < rows; theta += 1){
    v.push([]);
    for(let phi = 0; phi < cols; phi += 1){
      let r = (pLen*pow(abs(sin(pNum/2*phi*360/cols)),pSharp)+fD) * theta/rows;
      let x = r * cos(phi*360/cols);
      let y = r * sin(phi*360/cols);
      let z = vShape(fHeight, r/100, curve1, curve2, 1.5) - 200+
        bumpiness(b, r/100, bNum, phi*360/cols);

        let pos = createVector(x, y, z);
        v[theta].push(pos);
    }
  }

  for(let theta = 0; theta < v.length; theta++){
    fill(340, 100-theta, 100);
    for(let phi = 0; phi < v[theta].length; phi++){
      if(theta < v.length-1 && phi < v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
        vertex(v[theta+1][phi+1].x, v[theta+1][phi+1].y, v[theta+1][phi+1].z);
        vertex(v[theta][phi+1].x, v[theta][phi+1].y, v[theta][phi+1].z);
        endShape(CLOSE);
      }else if(theta < v.length-1 && phi == v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta][0].x, v[theta][0].y, v[theta][0].z);
        vertex(v[theta+1][0].x, v[theta+1][0].y, v[theta+1][0].z);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
        endShape(CLOSE);
      }
    }
  }
  v = [];
}

function vShape(A, r, a, b, c){
  return A*pow(Math.E, -b*pow(abs(r), c))*pow(abs(r), a);
}

function bumpiness(A, r, f, angle){
  return 1 + A * pow(r, 2) * sin(f * angle);
}