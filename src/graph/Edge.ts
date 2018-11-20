import IHash from "./IHash";
import { Vertex } from "./Vertex";

export class Edge implements IHash {
    protected pheromone: number;
    protected first: Vertex;
    protected second: Vertex;

    constructor(first: Vertex, second: Vertex, pheromone: number = 0.1) {
        this.pheromone = pheromone;
        this.first = first;
        this.second = second;
    }

    public getFirst(): Vertex {
        return this.first;
    }

    public getSecond(): Vertex {
        return this.second;
    }

    public setPheromone(value: number): void {
        this.pheromone = value;
    }

    public getPheromone(): number {
        return this.pheromone;
    }

    public hash(): number {
        return this.first.hash() + this.second.hash();
    }

    public toString(): string {
        return `{Edge -> first: ${this.getFirst()}, second: ${this.getSecond()}}`;
    }
}
