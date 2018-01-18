export default class Node {
    constructor(x, y, r, label) {
        this.position = { x, y }
        this.radius = r;
        this.radius2 = r * r;
        this.label = label;

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

        ctx.fillStyle = 'cyan'
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2*Math.PI);
        ctx.fill();

        if (this.label) {
            ctx.fillStyle = 'grey';
            ctx.textAlign = 'center';
            ctx.font = '48px serif';
            ctx.textBaseline = 'middle'
            ctx.fillText(this.label, x, y)
        }
    }

    drawHighlight(ctx) {
        const { x, y } = this.position;

        ctx.lineWidth = 10;
        ctx.strokeStyle = 'orange';
        ctx.beginPath();
        ctx.arc(x, y, this.radius + 15, 0, 2 * Math.PI);
        ctx.stroke();
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