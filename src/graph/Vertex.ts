import { Edge } from "./Edge";
import IHash from "./IHash";

export class Vertex implements IHash {
    /**
     * Calculate the distance between two vertices
     * TODO : replace this static method by an instance method to allow overriding
     * @param first Vertex
     * @param second Vertex
     */
    public static distance(first: Vertex, second: Vertex): number {
        const x = first.getX() - second.getX();
        const y = first.getY() - second.getY();
        return Math.sqrt(x * x + y * y);
    }

    protected edges: Map<number, Edge>;
    protected name: string;
    protected x: number;
    protected y: number;

    /**
     * Vertex constructor
     * @param name String Vertex Name
     * @param x Number X position
     * @param y Number Y position
     */
    constructor(name: string, x: number, y: number) {
        this.edges = new Map<number, Edge>();
        this.name = name;
        this.x = x;
        this.y = y;
    }

    /**
     * Get the vertex name
     * @return String
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Set the vertex name
     * @param name String
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Get the X position
     */
    public getX(): number {
        return this.x;
    }

    /**
     * Set the X position
     * @param value Number
     */
    public setX(value: number): void {
        this.x = value;
    }

    /**
     * Get the Y position
     * @return Number
     */
    public getY(): number {
        return this.y;
    }

    /**
     * Set the Y position
     * @param value Number
     */
    public setY(value: number): void {
        this.y = value;
    }

    /**
     * Calculate an unique hash to compoare vertices
     * the hash is implemented using the X and Y position
     * so two vertices with the same coordinates will be considered equal
     */
    public hash(): number {
        return 31 * this.x + this.y;
    }

    public toString(): string {
        return `{Vertex -> name: ${this.name}, x: ${this.x}, y: ${this.y}}`;
    }
}
