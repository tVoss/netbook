import Edge from './edge'
import Node from './node'

export default class Graph {
    constructor(n, nodeR) {
        this.edges = []
        this.nodes = []
        this.matrix = []
    }

    static fromMatrix(matrix, directed) {
        const graph = new Graph();
        for (let i = 0; i < matrix.length; i++) {
            graph.addNode(new Node(0, 0, 50));
        }

        for (let i = 0; i < matrix.length; i++) {
            for (let j = directed ? 0 : i; j < matrix.length; j++) {
                const val = matrix[i][j];
                const delta = i === j ? 2 : 1;
                for (let k = 0; k < val; k += delta) {
                    graph.addEdge(graph.nodes[i], graph.nodes[j], directed)
                }
            }
        }

        return graph;
    }

    addNode(node) {
        this.nodes.push(node);
        this.matrix.push([0]);
        for (let i = 0; i < this.matrix.length - 1; i++) {
            this.matrix[i].push(0);
            this.matrix[this.matrix.length - 1].push(0);
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

    addEdge(start, end, directed = false, label = null) {
        const startIndex = this.nodes.indexOf(start);
        const endIndex = this.nodes.indexOf(end)

        if (startIndex < 0 || endIndex < 0) {
            throw new Error("Nodes are not a part of this graph");
        }

        if (this.matrix[startIndex][endIndex]) {
            throw new Error("Double edges are not yet supported");
        }

        const edge = new Edge(start, end, directed, label);
        start.addOutEdge(edge);
        end.addInEdge(edge);
        if (!directed) {
            start.addInEdge(edge);
            end.addOutEdge(edge);
        }

        this.matrix[startIndex][endIndex] += 1;
        if (!directed || startIndex === endIndex) {
            this.matrix[endIndex][startIndex] += 1;
        }

        this.edges.push(edge)
    }

    addRandomEdge(directed = false) {
        const canidates = [];
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix.length; j++) {
                if (this.matrix[i][j] === 0) {
                    canidates.push({start: i, end: j});
                }
            }
        }
        const edge = canidates[Math.floor(Math.random() * canidates.length)];
        this.addEdge(this.nodes[edge.start], this.nodes[edge.end], directed);
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