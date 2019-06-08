let diagonal = 0
let rotation = 0
let particles = []
let speed = 0.07
let particlesCount = 800

function setup () {
  createCanvas(window.innerWidth, window.innerHeight)

  for (let i = 0; i < particlesCount; i++) {
    particles[i] = new Particle()
    particles[i].o = random(1, random(1, width / particles[i].n))
  }

  diagonal = sqrt(width * width + height * height) / 2
  background(0)
  noStroke()
  fill(255)
  frameRate(30)
}

function draw () {
  if (!mouseIsPressed)  {
    background(0)
    speed = 0.07
  } else {
    background(0)
    if (speed < 0.75) {
      speed += 0.02
    }
  }

  translate(width / 2, height / 2)
  rotation -= 0.002
  rotate(rotation)

  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    if (particles[i].drawDist() > diagonal) {
      particles[i] = new Particle();
    }
  }
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}

class Particle {
  constructor () {
    this.l = 1
    this.n = random(1, width/2)
    this.r = random(0, TWO_PI)
    this.o = random(1, random(1, width / this.n))
  }

  draw () {
    this.l++;
    push()
    rotate(this.r)
    translate(this.drawDist(), 0)
    fill(255, min(this.l, 255))
    ellipse(0, 0, width / this.o / 8, width / this.o  / 8)
    pop()
    this.o -= speed
  }

  drawDist () {
    return atan(this.n / this.o) * width / HALF_PI
  }
}
