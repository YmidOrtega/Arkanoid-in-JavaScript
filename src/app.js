const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 512;

function draw() {
 window.requestAnimationFrame(draw)
}

draw()