import { Edge, Graph, Vertex } from "../graph";
import { Tuple } from "../Tuple.type";

export class Ant {
    private graph: Graph;
    // @ts-ignore
    private currentVertex: Vertex;

    private visitedVertices: Set<Vertex>;
    private readonly tour: Vertex[];

    constructor(graph: Graph) {
        this.graph = graph;

        this.currentVertex = this.graph.getRandomVertex(); // randomly place ant on the graph
        this.visitedVertices = new Set<Vertex>();
        this.tour = [this.currentVertex]; // initialize the tour with the current vertex
    }

    public travel(): void {
        // don't allow to travel is the tour is complete
        if (this.isTravelFinished()) {
            throw new Error("Unable to travel, the tour is complete.");
        }

        // if the tour is complete, head back to the first city
        if (this.graph.getTotalVertices() === this.tour.length) {
            this.tour.push(this.tour[0]); // update the visited cities on the tour
            return;
        }

        // move to the next city
        const nextVertex = this.nextVertex();
        this.visitedVertices.add(nextVertex);
        this.tour.push(nextVertex);
        this.currentVertex = nextVertex;
    }

    public getTour(): Vertex[] {
        if (!this.isTravelFinished()) {
            // throw new Error("Cannot return an incomplete tour.");
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
    public isTravelFinished(): boolean {
        return this.graph.getTotalVertices() + 1 === this.tour.length;
    }

    /**
     * Get the next vertex to move to
     */
    public nextVertex(): Vertex {
        const probs = this.probabilities();
        const r = Math.random();

        // console.log(`Random probability is : ${r}`);
        for (const tuple of probs) {
            // console.log(`\tTuple -> ${tuple}`)
            if (r <= tuple[0]) {
                // console.log(`\t\tChosen Vertex is : ${tuple[1]}`)
                return tuple[1].getSecond();
            }
        }

        console.log(`Random probability is : ${r}`);
        console.log(probs);

        throw new Error("Unable to select an edge...");
    }

    // TODO : calculate list of probabilities
    private probabilities(): Array<Tuple<number, Edge>> {
        const denominator: number = this.denominator();
        const probabilities: Array<Tuple<number, Edge>> = [];

        const edgesList: Edge[] = this.graph.getEdges(this.currentVertex);
        for (const edge of edgesList) {
            if (this.visitedVertices.has(edge.getSecond())) {
                // console.log("Skipping already visited vertex");
                continue;
            }

            let probability = null;
            if (probabilities.length === 0) {
                probability = this.desirability(edge) / denominator;
            } else {
                const i: number = probabilities.length - 1;
                probability = probabilities[i][0] + this.desirability(edge) / denominator;
            }

            const tuple: Tuple<number, Edge> = [
                probability,
                edge,
            ];

            probabilities.push(tuple);
        }

        return probabilities;
    }

    // TODO : calculate denominator
    private denominator(): number {
        const edgesList: Edge[] = this.graph.getEdges(this.currentVertex);
        let denominator: number = 0.0;

        for (const edge of edgesList) {
            if (!this.visitedVertices.has(edge.getSecond())) {
                denominator += this.desirability(edge);
            }
        }

        return denominator;
    }

    // TODO  calculate desirability
    private desirability(edge: Edge): number {
        const pheromone: number = Math.pow(edge.getPheromone(), this.graph.getAlpha());
        const distance: number = Vertex.distance(edge.getFirst(), edge.getSecond());
        const distanceValue: number = Math.pow(1 / distance, this.graph.getBeta());
        return pheromone * distanceValue;
    }
}
