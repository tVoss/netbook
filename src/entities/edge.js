import Node from './node'

export default class Edge {
    constructor(start, end, directed = false, label = null) {
        this.start = start;
        this.end = end;
        this.directed = directed;
        this.label = label;
    }

    draw(ctx) {
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 1

        const selfLoop = this.start === this.end;

        if (selfLoop) {
            const { x, y } = this.start.position;
            ctx.beginPath();
            ctx.arc(x, y - this.start.radius - 5, 25, Math.PI - 0.5, +0.5);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(this.start.position.x, this.start.position.y);
            ctx.lineTo(this.end.position.x, this.end.position.y);
            ctx.stroke();
        }
        
        const { start, end } = this;

        const delta = {
            x: end.position.x - start.position.x,
            y: end.position.y - start.position.y
        }
        const magnitude = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

        const norm = selfLoop
            ? { x: Math.cos(Math.PI * 0.5), y: Math.sin(Math.PI * 0.5) } 
            : { x: delta.x / magnitude, y: delta.y / magnitude };

        const center = selfLoop
            ? { x: start.position.x + start.radius * 0.5, y: start.position.y - start.radius }
            : { x: start.position.x + delta.x * 3 / 5, y: start.position.y + delta.y * 3 / 5 }

        if (this.directed) {
            this.drawArrow(ctx, center, norm);
        }

        if (this.label) {
            const x = selfLoop ? start.position.x : center.x + norm.y * 50;
            const y = selfLoop ? start.position.y - 100 : center.y - norm.x * 50;
            this.drawLabel(ctx, x, y);
        }
    }

    drawArrow(ctx, center, norm) {
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

        ctx.beginPath();
        ctx.moveTo(tip.x, tip.y);
        ctx.lineTo(tail1.x, tail1.y);
        ctx.lineTo(tail2.x, tail2.y);
        ctx.fill();
    }

    drawLabel(ctx, x, y) {
        ctx.fillStyle = 'grey';
        ctx.textAlign = 'center';
        ctx.font = '48px serif';
        ctx.textBaseline = 'middle'
        ctx.fillText(this.label, x, y);
    }
}