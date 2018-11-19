export default abstract class Node {
    public static distance(node1: Node, node2: Node): number {
        const xDiff = node1.getX() - node2.getX();
        const yDiff = node1.getY() - node2.getY();

        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }

    protected name: string;
    protected x: number;
    protected y: number;

    protected constructor(name: string, x: number, y: number) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    public getName(): string {
        return this.name;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public hashCode(): number {
        let result: number = this.x;
        result = 31 * result + this.y;
        return result;
    }

    public toString(): string {
        return `Node : {name: ${this.getName()}, x: ${this.getX()}, y: ${this.getY()}`;
    }
}
