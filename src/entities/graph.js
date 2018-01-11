import Edge from './edge'
import Node from './node'

export default class Graph {
    constructor(n, nodeR) {
        this.edges = []
        this.nodes = []
        this.matrix = []

        for (let i = 0; i < n; i++) {
            this.nodes.push(new Node(0, 0, nodeR))
            const row = [];
            for (let j = 0; j < n; j++) {
                row.push(0);
            }
            this.matrix.push(row);
        }
    }

    draw(ctx) {
        this.edges.forEach(e => e.draw(ctx))
        this.nodes.forEach(n => n.draw(ctx))
    }

    grab(point) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].containsPoint(point)) {
                return this.nodes[i];
            }
        }
    }

    addEdge(node1, node2, directed = false) {
        const index1 = this.nodes.indexOf(node1);
        const index2 = this.nodes.indexOf(node2)

        if (index1 < 0 || index2 < 0) {
            throw new ReferenceError("Nodes are not a part of this graph");
        }

        this.matrix[index1][index2] += 1;
        if (!directed) {
            this.matrix[index2][index1] += 1;
        }
        this.edges.push(new Edge(node1, node2, directed))
    }

    fullyConnect(directed = false) {
        for(let i = 0; i < this.nodes.length; i++) {
            for(let j = directed ? 0 : i + 1; j < this.nodes.length; j++) {
                this.addEdge(this.nodes[i], this.nodes[j], directed);
            }
        }
    }

    arrangeInCircle(r, offset = { x: 0, y: 0 }) {
        const center = {
            x: r + offset.x,
            y: r + offset.y
        }

        for (let i = 0; i < this.nodes.length; i++) {
            const theta = i / this.nodes.length * Math.PI * 2;
            this.nodes[i].position = {
                x: center.x + r * Math.sin(theta),
                y: center.y - r * Math.cos(theta)
            }
        }
    }
}