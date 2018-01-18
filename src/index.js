import { DFA, Node, Graph } from './entities';
import { Mouse } from './util'

const canvas = document.getElementById('graphsCanvas');
const ctx = canvas.getContext('2d');
const mouse = new Mouse(canvas)

let fullyConnected = false;
let grabbedNode = null;
let hoveredNode = null;

const Q = ['a', 'b', 'c', 'd', 'e'];
const Sigma = [ '0', '1', ]
const delta = {
    'a': {
        '0': 'b',
        '1': 'a'
    },
    'b': {
        '0': 'b',
        '1': 'd'
    },
    'c': {
        '0': 'd',
        '1': 'e',
    },
    'd': {
        '0': 'b',
        '1': 'e'
    },
    'e': {
        '0': 'e',
        '1': 'd'
    }
}
let dfa = new DFA(Q, Sigma, delta, 'a', ['e'])

function main() {
    update();
    redraw();
    requestAnimationFrame(main);
}

function update() {
    hoveredNode = dfa.graph.grab(mouse.position);
    canvas.style.cursor = hoveredNode ? 'pointer' : 'auto'    

    if (mouse.wasPressed) {
        grabbedNode = hoveredNode;
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
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1000, 1000);

    dfa.draw(ctx);
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