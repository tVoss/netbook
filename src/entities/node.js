import Entity from './entity'

export default class Node extends Entity {
    constructor(x, y, r) {
        super(x, y);
        this.radius = r;
        this.radius2 = r * r;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI);
        ctx.stroke();
    }

    containsPoint({x, y}) {
        const dx = this.posX - x;
        const dy = this.posY - y;
        const delta = dx * dx + dy * dy;
        return delta < this.radius2;
    }
}