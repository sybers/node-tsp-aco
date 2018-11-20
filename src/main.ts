import Edge from "./graph/Edge";
import Graph from "./graph/Graph";
import Vertex from "./graph/Vertex";

const main = () => {
    // test parameters
    const evap = 0.1;
    const alpha = 1;
    const beta = 5;

    const graph: Graph = new Graph(evap, alpha, beta);
    const vertices: Vertex[] = [
        new Vertex("A", 0, 0),
        new Vertex("B", 10, 20),
        new Vertex("C", 20, 30),
        new Vertex("D", 50, 30),
    ];

    // add vertices first...
    for (const v of vertices) {
        graph.addVertex(v);
    }

    // ...then create connections between them
    for (const v of graph.getVertices()) {
        // connect all vertices to each other
        for (const v2 of graph.getVertices()) {
            if (v !== v2) {
                graph.addEdge(new Edge(v, v2));
            }
        }
    }

    console.log(graph);
};

main();
