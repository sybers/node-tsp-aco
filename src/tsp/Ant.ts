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

        // add the initial vertex to the tabu list
        this.visitedVertices.add(this.currentVertex);
        this.tour = [this.currentVertex]; // initialize the tour with the current vertex
    }

    public travel(): void {
        // don't allow to travel is the tour is complete
        if (this.isTravelFinished()) {
            throw new Error("Unable to travel, the tour is complete.");
        }

        // if the tour is complete, head back to the first city
        if (this.graph.getTotalVertices() === this.tour.length) {
            this.tour.push(this.tour[0]);
            return;
        }

        // move to the next city
        const nextVertex = this.nextVertex();
        this.visitedVertices.add(nextVertex);
        this.tour.push(nextVertex);
        this.currentVertex = nextVertex;
    }

    /**
     * Get the ant tour
     * @return Vertex[] ordered visited vertices
     */
    public getTour(): Vertex[] {
        if (!this.isTravelFinished()) {
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
    public isTravelFinished(): boolean {
        return this.graph.getTotalVertices() + 1 === this.tour.length;
    }

    /**
     * Get the next vertex to move to
     */
    public nextVertex(): Vertex {
        const probs = this.probabilities();
        const r = Math.random();

        for (const tuple of probs) {
            if (r <= tuple[0]) {
                return tuple[1].getOppositeEnd(this.currentVertex);;
            }
        }

        console.log(probs);
        throw new Error("Unable to select an edge...");
    }

    // TODO : calculate list of probabilities
    private probabilities(): Array<Tuple<number, Edge>> {
        const probabilities: Array<Tuple<number, Edge>> = [];

        // retreive allowed edges, ie. the ones leading to a vertex that has not been visited
        const allowedEdges: Edge[] =
            this.graph.getEdgesForVertex(this.currentVertex)
            .filter((e) => !this.visitedVertices.has(e.getOppositeEnd(this.currentVertex)));

        const denominator: number = this.denominator(allowedEdges);

        for (const edge of allowedEdges) {
            // accumulate probabilities to be able to iterate them
            const probability =
                (probabilities.length === 0 ? 0 : probabilities[probabilities.length - 1][0]) +
                this.desirability(edge) / denominator;

            const tuple: Tuple<number, Edge> = [
                probability,
                edge,
            ];

            probabilities.push(tuple);
        }

        return probabilities;
    }

    /**
     * Calculate the sum of probabilities for the given edges
     * @param edges
     */
    private denominator(edges: Edge[]): number {
        return edges.reduce((acc, v) => acc + this.desirability(v), 0);
    }

    /**
     * Calculate the desirability for a given edge
     * @param edge
     */
    private desirability(edge: Edge): number {
        const pheromone: number = Math.pow(edge.getPheromone(), this.graph.getAlpha());

        const distance: number = Vertex.distance(edge.getFirst(), edge.getSecond());
        const distanceValue: number = Math.pow(1 / distance, this.graph.getBeta());
        return pheromone * distanceValue;
    }
}
