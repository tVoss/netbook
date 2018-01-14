import Node from './node'

export default class Edge {
    constructor(start, end, directed = false, color = 'black') {
        this.start = start;
        this.end = end;
        this.directed = directed;
    }

    draw(ctx) {
        ctx.fillStyle = 'red'
        ctx.strokeStyle = 'green'
        ctx.beginPath();
        ctx.moveTo(this.start.position.x, this.start.position.y);
        ctx.lineTo(this.end.position.x, this.end.position.y);
        ctx.stroke();

        if (this.directed) {
            this.drawArrow(ctx);
        }
    }

    drawArrow(ctx) {
        const { start, end } = this
        const delta = {
            x: end.position.x - start.position.x,
            y: end.position.y - start.position.y
        }
        const magnitude = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        const norm = {
            x: delta.x / magnitude,
            y: delta.y / magnitude
        }
        const center = {
            x: start.position.x + delta.x * 3 / 5,
            y: start.position.y + delta.y * 3 / 5
        }
        const tip = {
            x: center.x + norm.x * 10,
            y: center.y + norm.y * 10
        }
        const tail1 = {
            x: center.x - norm.x * 10 + norm.y * 5,
            y: center.y - norm.y * 10 - norm.x * 5
        }

        const tail2 = {
            x: center.x - norm.x * 10 - norm.y * 5,
            y: center.y - norm.y * 10 + norm.x * 5,
        }

        ctx.moveTo(tip.x, tip.y);
        ctx.lineTo(tail1.x, tail1.y);
        ctx.lineTo(tail2.x, tail2.y);
        ctx.fill();

    }
}