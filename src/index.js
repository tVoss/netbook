import { Node, Graph } from './entities';
import { Mouse } from './util'

const canvas = document.getElementById('graphsCanvas');
const ctx = canvas.getContext('2d');
const mouse = new Mouse(canvas)

let fullyConnected = false;
let grabbedNode = null;

const n = Math.floor(Math.random() * 9) + 3;
const graph = new Graph(n, 50);
graph.arrangeInCircle(200, { x: 50, y: 50 })

function main() {
    update();
    redraw();
    requestAnimationFrame(main);
}

function update() {
    const overNode = graph.grab(mouse.position);
    canvas.style.cursor = overNode ? 'pointer' : 'auto'    

    if (mouse.wasPressed) {
        grabbedNode = overNode;
        if (!fullyConnected) {
            graph.fullyConnect(true)
            fullyConnected = true;
        }
    }

    if (mouse.wasReleased) {
        grabbedNode = null;
    }

    if (grabbedNode) {
        grabbedNode.translate(mouse.delta)
    }

    mouse.reset();
}

function redraw() {
    // Clear screen
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.fillStyle = 'black';

    graph.draw(ctx)
}

function drawLaser() {
    const { x, y } = mouse.position;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1000);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1000, y);
    ctx.stroke();
}

main();