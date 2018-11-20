import IHash from "./IHash";

export class Vertex implements IHash {
    public static distance(first: Vertex, second: Vertex): number {
        const x = first.getX() - second.getX();
        const y = first.getY() - second.getY();
        return Math.sqrt(x * x + y * y);
    }

    protected name: string;
    protected x: number;
    protected y: number;

    constructor(name: string, x: number, y: number) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getX(): number {
        return this.x;
    }

    public setX(value: number): void {
        this.x = value;
    }

    public getY(): number {
        return this.y;
    }

    public setY(value: number): void {
        this.y = value;
    }

    public hash(): number {
        return (this.x + this.y) * 11;
    }

    public toString(): string {
        return `{Vertex -> name: ${this.name}, x: ${this.x}, y: ${this.y}}`;
    }
}
