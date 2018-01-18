import Graph from './graph'
import Node from './node'

export default class DFA {
    
    // Q: list of state names
    // Sigma: list of alphabet
    // delta[q][sigma]: mapping of Q and sigma to Q'
    // s: name of initial state
    // A: list of accepting states
    constructor(Q, Sigma, delta, s, A) {
        this.graph = new Graph(0, 50);

        this.states = {};
        this.accept = A;
        this.start = s;
        Q.forEach(q => {
            this.states[q] = new Node(0, 0, 50, q)
            this.graph.addNode(this.states[q]);
        });
        Q.forEach(q => {
            Sigma.forEach(sigma => {
                const next = delta[q][sigma];
                if (!next) {
                    return;
                }
                
                const start = this.states[q];
                const end = this.states[next];

                this.graph.addEdge(start, end, true, sigma)
            });
        });

        this.graph.arrangeInCircle(300, { x: 100, y: 100 })
    }

    draw(ctx) {
        this.accept.forEach(a => this.states[a].drawHighlight(ctx));
        this.graph.draw(ctx);
    }
}