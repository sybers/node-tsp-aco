import IHash from "./IHash";
import Node from "./Node";
import Vertex from "./Vertex";

export default class Graph {
    private readonly hashMap: IHash<Vertex>;
    private readonly list: Vertex[];
    private evaporationRate: number;
    private totalEdges: number;
    private readonly alpha: number;
    private readonly beta: number;

    constructor(evaporationRate: number, alpha: number, beta: number) {
        this.evaporationRate = evaporationRate;
        this.alpha = alpha;
        this.beta = beta;

        this.hashMap = {};
        this.list = [];
        this.totalEdges = 0;
    }

    public getAlpha(): number {
        return this.alpha;
    }

    public getBeta(): number {
        return this.beta;
    }

    public getTotalVertices(): number {
        return Object.keys(this.hashMap).length;
    }

    public getTotalEdges(): number {
        return this.totalEdges;
    }

    public isEmpty(): boolean {
        return Object.keys(this.hashMap).length === 0;
    }

    public addVertex(vertex: Vertex): void {
        this.hashMap[vertex.hashCode()] = vertex;
        this.list.push(vertex);
    }

    public getVertex(n: Node): Vertex {
        return this.hashMap[n.hashCode()];
    }

    public addEdge(vertex: Vertex, n: Node): void {
        vertex.addEdge(n);
        this.totalEdges++;
    }

    public getVertices(): Node[] {
        return Object.assign([], this.list);
    }
}
