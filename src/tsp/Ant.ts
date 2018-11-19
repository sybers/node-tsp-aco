import Graph from "../Graph";
import Node from "../Node";
import Vertex from "../Vertex";

export default class Ant {
    private graph: Graph;
    private currentNode: Node;

    private visitedCities: Set<Node>;
    private tour: Node[];

    constructor(graph: Graph) {
        this.graph = graph;

        this.currentNode = this.getRandomVertex(); // randomly place ant on the graph
    }

    public getRandomVertex(): Vertex {
        return new Vertex("a", 0, 0); // TODO : select random vertex from the graph
    }
}
