import Edge from "./Edge";
import IHash from "./IHash";
import Node from "./Node";

export default class Vertex extends Node {
    protected hashMap: IHash<Edge>;
    protected list: Edge[];

    constructor(name: string, x: number, y: number) {
        super(name, x, y);
        this.hashMap = {};
        this.list = [];
    }

    public addEdge(n: Node): void {
        if (n instanceof Vertex) {
            const e: Edge = new Edge(n.getName(), n.getX(), n.getY());
            this.hashMap[e.hashCode()] = e;
            this.list.push(e);
        } else {
            this.hashMap[(n as Edge).hashCode()] = n as Edge;
            this.list.push(n as Edge);
        }
    }

    public getEdge(n: Node): Edge {
        return this.hashMap[n.hashCode()] || null;
    }

    public contains(n: Node): boolean {
        return !!this.hashMap[n.hashCode()];
    }

    public getTotalEdges(): number {
        return Object.keys(this.hashMap).length;
    }

    public toString(): string {
        return `Vertex : {name: ${this.name}, x: ${this.x}, y: ${this.y}, edges: ${this.hashMap}`;
    }
}
