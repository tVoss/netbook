import { Entity, Node } from './index'

export default class Graph extends Entity {
    constructor(n) {
        this.nodes = []
        this.matrix = []
        for (let i = 0; i < n; i++) {
            this.nodes.push(new Node(i * 100 + 100, 100, 50))
            const row = [];
            for (let j = 0; j < n; j++) {
                row.push(0);
            }
            this.matrix.push(row);
        }
    }
}