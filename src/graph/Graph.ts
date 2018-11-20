import { Edge } from "./Edge";
import { Vertex } from "./Vertex";

/**
 * The Graph class holds the graph representing the cities for the TSP problem,
 * it is composed of vertices which have edges to other vertices.
 *
 * Each edge has a `pheromones` value, ants are using these `pheromones` to chose which way
 * to go next.
 *
 * The pheromones are evaporating at the given `evaporationRate`
 */
export class Graph {
    private readonly vertices: Map<number, Vertex>;
    private readonly edges: Map<number, Edge>;
    // @ts-ignore
    private readonly evaporationRate: number;
    private readonly alpha: number;
    private readonly beta: number;

    /**
     * Create a new graph with the given parameters
     * @param evaporationRate
     * @param alpha
     * @param beta
     */
    constructor(evaporationRate: number, alpha: number, beta: number) {
        this.evaporationRate = evaporationRate;
        this.alpha = alpha;
        this.beta = beta;

        this.vertices = new Map<number, Vertex>();
        this.edges = new Map<number, Edge>();
    }

    /**
     * Get alpha value
     * @return number alpha
     */
    public getAlpha(): number {
        return this.alpha;
    }

    /**
     * Get beta value
     * @return number beta
     */
    public getBeta(): number {
        return this.beta;
    }

    /**
     * Get the total number of vertices
     * @return number total number of vertices
     */
    public getTotalVertices(): number {
        return Array.from(this.vertices.values()).length;
    }

    /**
     * Get the total number of edges on the graph
     * @return number number of edges
     */
    public getTotalEdges(): number {
        return Array.from(this.edges.values()).length;
    }

    /**
     * Check if the graph is empty
     * @return boolean true if the graph is empty, false otherwise
     */
    public isEmpty(): boolean {
        return this.getTotalVertices() === 0;
    }

    /**
     * Add a vertex to the graph
     * @param vertex Vertex
     */
    public addVertex(vertex: Vertex): void {
        this.vertices.set(vertex.hash(), vertex);
    }

    /**
     * Select a random vertex on the graph to start with
     * @return a random vertex from the graph
     */
    public getRandomVertex(): Vertex {
        const vertices = this.getVertices();
        return vertices[Math.floor(Math.random() * vertices.length)];
    }

    /**
     * Get the list of vertices of this graph
     * @return Vertex[] vertices array
     */
    public getVertices(): Vertex[] {
        return Array.from(this.vertices.values());
    }

    /**
     * Connect the two vertices with a edge
     * @param edge Edge the edge to add
     */
    public addEdge(edge: Edge): void {
        this.edges.set(edge.hash(), edge);
    }

    /**
     * Return the graph properties as a string
     * @return string Graph properties
     */
    public toString(): string {
        let str = "VERTICES : \n";

        this.vertices.forEach((v) => {
            str += "\t" + v.getName() + "\n";
        });

        return str;
    }

    /**
     * Update the pheromones on the graph for the given ant
     * @param ant Ant the ant for which to update the pheromones
     */
    /*public updatePheromone(ant: Ant): void {
        const tour: Node[] = ant.getTour();
        const evaluation: number = ant.eval();
        const probability: number = (1 / this.evaporationRate);

        const hashSet: Set<Edge> = new Set();

        for (let i = 1; i < tour.length; i++) {
            const edge1: Edge = this.getVertex(tour[i - 1]).getEdge(tour[i]);
            const edge2: Edge = this.getVertex(tour[i]).getEdge(tour[i - 1]);

            // The pheromones.
            const p1: number = edge1.getPheromone();
            const p2: number = edge2.getPheromone();

            hashSet.add(edge1);
            hashSet.add(edge2);

            edge1.setPheromone(probability * p1 + 1.0 / evaluation);
            edge2.setPheromone(probability * p2 + 1.0 / evaluation);
        }

        // Evaporate the pheromones on all the rest of the edges.
        for (const vertex of this.verticesList) {
            for (const edge of vertex.getEdgeList()) {
                if (!hashSet.has(edge)) {
                    const p: number = edge.getPheromone();
                    edge.setPheromone(probability * p);
                }
            }
        }
    } */
}
