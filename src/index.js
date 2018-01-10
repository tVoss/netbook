import { Node } from './entities';
import { Mouse } from './util'

const canvas = document.getElementById('graphsCanvas');
const ctx = canvas.getContext('2d');
const canvasRect = canvas.getBoundingClientRect();

// Because the internet
ctx.translate(-canvasRect.left - 2, -canvasRect.top - 2);

const mouse = new Mouse(canvas)

let mouseInCircle = false;
let circleGrabbed = false;

const nodes = [
    new Node(100, 100, 50),
    new Node(200, 200, 60)
];

let grabbedNode = null;

function main() {
    update();
    redraw();
    requestAnimationFrame(main);
}

function update() {
    let hitNode;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].containsPoint(mouse.position)) {
            hitNode = nodes[i];
            break;
        }
    }

    canvas.style.cursor = hitNode ? 'pointer' : 'auto'

    if (mouse.wasPressed && hitNode) {
        grabbedNode = hitNode;
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

    nodes.forEach(node => node.draw(ctx))
    drawLaser()
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