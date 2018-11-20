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
    private readonly isOriented: boolean;

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
        this.isOriented = isOriented;

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
        const length = Array.from(this.edges.values()).length;
        return this.isOriented ? length : length / 2;
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
     * Get the list of vertices of this graph
     * @return Vertex[] vertices array
     */
    public getVertices(): Vertex[] {
        return Array.from(this.vertices.values());
    }

    /**
     * Connect the two vertices with a edge
     * @param from
     * @param to
     * @param pheromones
     * @return created Edge
     */
    public addEdge(from: Vertex, to: Vertex, pheromones: number = 0.1): Edge {
        const edge = new Edge(from, to, pheromones);
        this.edges.set(edge.hash(), edge);

        // create the opposite edge if it's not an oriented graph
        if (!this.isOriented) {
            const oppositeEdge = new Edge(to, from, pheromones);
            this.edges.set(oppositeEdge.hash(), oppositeEdge);
        }

        return edge;
    }

    /**
     * Get the edges connected to a graph
     * @param vertex Vertex
     * @return edges Edge[]
     */
    public getEdges(vertex: Vertex): Edge[] {
        return Array.from(this.edges.values()).filter((E) => E.getFirst() === vertex);
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
    public updatePheromone(ant: Ant): void {
        const tour: Vertex[] = ant.getTour();
        const evaluation: number = ant.evaluate();
        const probability: number = (1 / this.evaporationRate);

        const hashSet: Set<Edge> = new Set();

        // update pheromones for every edges on the tour
        for (let i = 1; i < tour.length; i++) {
            const edge1: Edge = this.getEdges(tour[i - 1])[0];
            const edge2: Edge = this.getEdges(tour[i])[0];

            // The pheromones.
            const p1: number = edge1.getPheromone();
            const p2: number = edge2.getPheromone();

            hashSet.add(edge1);
            hashSet.add(edge2);

            edge1.setPheromone(probability * p1 + 1.0 / evaluation);
            edge2.setPheromone(probability * p2 + 1.0 / evaluation);
        }

        // Evaporate the pheromones on all the rest of the edges.
        for (const vertex of this.getVertices()) {
            for (const edge of this.getEdges(vertex)) {
                if (!hashSet.has(edge)) {
                    const p: number = edge.getPheromone();
                    edge.setPheromone(probability * p);
                }
            }
        }
    }
}
