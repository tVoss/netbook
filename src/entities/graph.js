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

    static fromMatrix(matrix, directed) {
        const graph = new Graph(matrix.length, 50);

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

    addEdge(start, end, directed = false) {
        const startIndex = this.nodes.indexOf(start);
        const endIndex = this.nodes.indexOf(end)

        if (startIndex < 0 || endIndex < 0) {
            throw new ReferenceError("Nodes are not a part of this graph");
        }

        const edge = new Edge(start, end, directed);
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