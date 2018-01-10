import Entity from './entity'

export default class Node extends Entity {
    
    radius;
    
    constructor(x, y, r) {
        super(x, y);
        this.radius = r;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.stroke();
    }

    containsPoint({x, y}) {
        const dx = Math.pow(this.x - x, 2);
        const dy = Math.pow(this.y - y, 2);
        const dist = Math.sqrt(dx + dy);
        return dist < this.radius;
    }
}