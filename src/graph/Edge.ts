import IHash from "./IHash";
import { Vertex } from "./Vertex";

/**
 * Class Edge
 * An edge is a link between two vertices,
 * it can have additional metadata attached to it.
 */
export class Edge implements IHash {
    // TODO : replace pheromone value by a metadata bag
    protected pheromone: number;
    protected first: Vertex;
    protected second: Vertex;

    /**
     * Vertex constructor
     * @param first Vertex first vertex
     * @param second Vertex second vertex
     * @param pheromone Number initial amount of pheromones on the edge
     */
    constructor(first: Vertex, second: Vertex, pheromone: number = 0.1) {
        this.pheromone = Math.random() * 2;
        this.first = first;
        this.second = second;
    }

    /**
     * Get the first end of an edge
     */
    public getFirst(): Vertex {
        return this.first;
    }

    /**
     * Get the second end of an edge
     */
    public getSecond(): Vertex {
        return this.second;
    }

    /**
     * Set the value of pheromones on this edge
     * @param value Number
     */
    public setPheromone(value: number): void {
        this.pheromone = value;
    }

    /**
     * Get the value of pheromones on this edge
     * @return Number
     */
    public getPheromone(): number {
        return this.pheromone;
    }

    /**
     * Return the opposite Vertex of an edge
     * @param vertex
     */
    public getOppositeEnd(vertex: Vertex): Vertex {
        if (this.first === vertex || this.second === vertex) {
            return vertex === this.first ? this.second : this.first;
        } else {
            throw new Error("The vertex is not connected to this edge");
        }
    }

    /**
     * Hash value to check equality between two edges
     */
    public hash(): number {
        return Math.sqrt(this.first.hash()) + Math.sqrt(this.second.hash());
    }

    public toString(): string {
        return `{Edge -> first: ${this.getFirst()}, second: ${this.getSecond()}}`;
    }
}
