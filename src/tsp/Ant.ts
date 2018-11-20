import { Edge, Graph, Vertex } from "../graph";
import { Tuple } from "../Tuple.type";

export default class Ant {
    private graph: Graph;
    // @ts-ignore
    private currentVertex: Vertex;

    private visitedVertices: Set<Vertex>;
    private readonly tour: Vertex[];

    constructor(graph: Graph) {
        this.graph = graph;

        this.currentVertex = this.graph.getRandomVertex(); // randomly place ant on the graph
        this.visitedVertices = new Set<Vertex>();
        this.tour = [];
    }

    public travel(): void {
        // don't allow to travel is the tour is complete
        if (!this.notFinished()) {
            throw new Error("Unable to travel, the tour is complete.");
        }

        // if the tour is complete, head back to the first city
        if (this.graph.getTotalVertices() === this.tour.length) {
            console.log("Tour complete, going back to initial vertex");
            this.tour.push(this.tour[0]); // update the visited cities on the tour
            console.log(this.tour);
            console.log("\n\n");
            return;
        }

        // move to the next city
        const nextVertex = this.nextVertex();
        this.visitedVertices.add(nextVertex);
        this.tour.push(nextVertex);
        this.currentVertex = nextVertex;
    }

    public getTour(): Node[] {
        if (this.notFinished()) {
            throw new Error("Cannot return an incomplete tour.");
        }

        return Object.assign([], this.tour);
    }

    /**
     * Evaluate the total distance of the tour
     * @return total distance of the tour
     */
    public evaluate(): number {
        let val: number = 0;
        for (let i = 1; i < this.tour.length; i++) {
            val += Vertex.distance(this.tour[i], this.tour[i - 1]);
        }

        return val;
    }

    /**
     * Checks wether the tour is finished
     * @return true if the ant visited all cities, false otherwise
     */
    public notFinished(): boolean {
        return this.graph.getTotalVertices() + 1 !== this.tour.length;
    }

    /**
     * Move to the next Vertex and
     */
    public nextVertex(): Vertex {
        const probs = this.probabilities();
        const r = Math.random();

        for (const tuple of probs) {
            console.log(`prob : ${tuple[0]}, rand : ${r}`);
            if (r <= tuple[0]) {
                console.log(`selected ${tuple[1]}`);
                return tuple[1];
            }
        }

        throw new Error("Unable to select edge...");
    }

    // TODO : calculate list of probabilities
    private probabilities(): Array<Tuple<number, Vertex>> {
        const denominator: number = this.denominator();
        const probabilities: Array<Tuple<Edge, number>> = [];

        // const edgeList = this.graph.getVertex(this.currentNode).getEdgeList();
        // TODO : get edge list from the current vertice
        const vertexList: Vertex[] = [];
        for (const vertex of vertexList) {
            if (this.visitedVertices.has(vertex)) {
                continue;
            }

            let probability = null;
            if (probabilities.length === 0) {
                probability = this.desirability(vertex) / denominator;
            } else {
                const i: number = probabilities.length - 1;
                probability = probabilities[i].right + this.desirability(vertex) / denominator;
            }

            const tuple: Tuple<number, Vertex> = [
                probability,
                vertex,
            ];

            probabilities.push(tuple);
        }

        return probabilities;
    }

    // TODO : calculate denominator
    private denominator(): number {
        // const edgeList = this.graph.getVertex(this.currentNode).getEdgeList();
        const vertexList: Vertex[] = [];
        let denominator: number = 0.0;

        for (const vertex of vertexList) {
            if (!this.visitedVertices.has(vertex)) {
                denominator += this.desirability(vertex);
            }
        }

        return denominator;
    }

    // TODO  calculate desirability
    private desirability(edge: Edge): number {
        const pheromone: number = Math.pow(edge.getPheromone(), this.graph.getAlpha());
        const distance: number = Node.distance(this.currentVertex, edge);
        const distanceValue: number = Math.pow(1 / distance, this.graph.getBeta());
        return pheromone * distanceValue;
    }
}
