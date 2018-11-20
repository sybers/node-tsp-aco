import { Graph } from "./graph";
import { TSP } from "./tsp";

const main = () => {
    // test parameters
    const evap = 0.1;
    const alpha = 1;
    const beta = 5;

    const graph: Graph = new Graph(evap, alpha, beta);
    const vertices: any[] = [
        { name: "A", x: 0, y: 0 },
        { name: "B", x: 10, y: 20 },
        { name: "C", x: 20, y: 30 },
        { name: "D", x: 50, y: 10 },
    ];

    // add vertices first...
    for (const item of vertices) {
        graph.addVertex(item.name, item.x, item.y);
    }

    // ...then create connections between them
    for (const v of graph.getVertices()) {
        // connect all vertices to each other
        for (const v2 of graph.getVertices()) {
            if (v !== v2) {
                graph.addEdge(v, v2);
            }
        }
    }

    console.log("Graph has ", graph.getTotalVertices(), " vertices");
    console.log("Graph has ", graph.getTotalEdges(), " edges");

    const tsp = new TSP(graph, 100, 20);
    tsp.run();
};

main();
