import { Ant } from "../tsp/";
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
     * @param isOriented
     */
    constructor(evaporationRate: number, alpha: number, beta: number, isOriented: boolean = false) {
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
     * Get the vertices of this graph as an array
     * @return Vertex[] vertices array
     */
    public getVertices(): Vertex[] {
        return Array.from(this.vertices.values());
    }

    /**
     * Get the total number of vertices
     * @return number total number of vertices
     */
    public getTotalVertices(): number {
        return this.getVertices().length;
    }

    /**
     * Get the edges of this graph as an array
     * @return Edge[] edges array
     */
    public getEdges(): Edge[] {
        return Array.from(this.edges.values());
    }

    /**
     * Get the total number of edges on the graph
     * @return number number of edges
     */
    public getTotalEdges(): number {
        return this.getEdges().length;
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
     * @param name String
     * @param x Number
     * @param y Number
     * @return created Vertex
     */
    public addVertex(name: string, x: number, y: number): Vertex {
        const vertex: Vertex = new Vertex(name, x, y);
        this.vertices.set(vertex.hash(), vertex);

        return vertex;
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
     * Connect the two vertices with a edge
     * @param first Vertex
     * @param second Vertex
     * @param pheromones
     * @return created Edge
     */
    public addEdge(first: Vertex, second: Vertex, pheromones: number = 0.1): Edge {
        const edge = new Edge(first, second, pheromones);
        if (!this.edges.has(edge.hash())) {
            this.edges.set(edge.hash(), edge);
        }

        return edge;
    }

    /**
     * Remove an edge from the graph
     * @param edge
     * @return boolean true if the edge was removed, false otherwise
     */
    public removeEdge(edge: Edge): boolean {
        return this.edges.delete(edge.hash());
    }

    /**
     * Returns the edges connected to a vertex
     * @param vertex
     */
    public getEdgesForVertex(vertex: Vertex) {
        return this.getEdges().filter((e) => e.getFirst() === vertex || e.getSecond() === vertex);
    }

    /**
     * Get the edge between two vertices
     * @param first
     * @param second
     */
    public getEdgeBetweenVertices(first: Vertex, second: Vertex): Edge|undefined {
        return this.getEdges().find((e) => {
            return e.getFirst() === first && e.getSecond() === second ||
                e.getFirst() === second && e.getSecond() === first;
        });
    }

    /**
     * Update the pheromones on the graph for the given ant
     * @param ant Ant the ant for which to update the pheromones
     */
    public updatePheromone(ant: Ant): void {
        const tour: Vertex[] = ant.getTour();
        const evaluation: number = ant.evaluate();
        const evaporationRateDecay: number = (100 - this.evaporationRate) / 100;

        const hashSet: Set<Edge> = new Set();

        // update pheromones for every edges on the tour
        for (let i = 1; i < tour.length; i++) {
            const edge = this.getEdgeBetweenVertices(tour[i - 1], tour[i]);

            if (edge !== undefined) {
                const currentPheromones: number = edge.getPheromone();

                hashSet.add(edge);

                const newValue = evaporationRateDecay * currentPheromones + 1 / (evaluation * 0.1);

                edge.setPheromone(newValue);
            }
        }

        // Evaporate the pheromones on all the rest of the edges.
        for (const edge of this.getEdges()) {
            if (!hashSet.has(edge)) {
                const p: number = edge.getPheromone();
                edge.setPheromone(p * evaporationRateDecay);
            }
        }
    }
}
