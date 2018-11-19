import Node from "./Node";

export default class Edge extends Node {
    protected pheromone: number;

    constructor(name: string, x: number, y: number) {
        super(name, x, y);
        this.pheromone = 0.1;
    }

    public setPheromone(value: number): void {
        this.pheromone = value;
    }

    public getPheromone(): number {
        return this.pheromone;
    }

    public toString(): string {
        return `Edge : {name: ${this.getName()}, x: ${this.getX()}, y: ${this.getY()}`;
    }
}
