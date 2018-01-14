export default class Node {
    constructor(x, y, r) {
        this.position = { x, y }
        this.radius = r;
        this.radius2 = r * r;

        this.inEdges = [];
        this.outEdges = [];
    }

    addInEdge(edge) {
        this.inEdges.push(edge);
    }

    removeInEdge(edge) { 
        this.inEdges = this.inEdges.filter(e => e !== edge)
    }

    addOutEdge(edge) {
        this.outEdges.push(edge);
    }

    removeOutEdge(edge) {
        this.outEdges = this.outEdges.filter(e => e !== edge)
    }

    draw(ctx) {
        const { x, y } = this.position;

        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2*Math.PI);
        ctx.fill();
    }

    containsPoint({x, y}) {
        const dx = this.position.x - x;
        const dy = this.position.y - y;
        const delta = dx * dx + dy * dy;
        return delta < this.radius2;
    }

    translate({dx, dy}) {
        this.position.x += dx;
        this.position.y += dy;
    }
}