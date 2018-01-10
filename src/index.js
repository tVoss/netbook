import { Entity } from './entities';

const canvas = document.getElementById('graphsCanvas');
const ctx = canvas.getContext('2d');
const canvasRect = canvas.getBoundingClientRect();

// Because the internet
ctx.translate(-canvasRect.left, -canvasRect.top);

let mouseX = 0;
let mouseY = 0;
let mouseDx = 0;
let mouseDy = 0;
let mouseDown = false;
let mouseDist = 0;
let mouseInCircle = false;

let circleX = 100;
let circleY = 100;
let circleGrabbed = false;

const node = new Node(100, 100, 50);

function main() {
    redraw();
}

function redraw() {
    // Clear screen
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.fillStyle = 'black';

    node.draw(ctx)
}

function drawLaser() {
    ctx.beginPath();
    ctx.moveTo(mouseX, 0);
    ctx.lineTo(mouseX, 1000);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, mouseY);
    ctx.lineTo(1000, mouseY);
    ctx.stroke();
}

canvas.onmousedown = function(e) {
    mouseDown = true;

    circleGrabbed = mouseInCircle;
}

canvas.onmouseup = function(e) {
    mouseDown = false;

    circleGrabbed = false;
}

canvas.onmousemove = function(e) {
    mouseDx = e.clientX - mouseX;
    mouseDy = e.clientY - mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;

    const dx = Math.pow(mouseX - circleX, 2);
    const dy = Math.pow(mouseY - circleY, 2);
    mouseDist = Math.sqrt(dx + dy);
    mouseInCircle = mouseDist < 50;

    canvas.style.cursor = mouseInCircle ? 'pointer' : 'auto'

    if (circleGrabbed) {
        circleX += mouseDx;
        circleY += mouseDy;
        requestAnimationFrame(redraw);
    }
}

main();