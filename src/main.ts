import { Graph } from "./graph";
import { TSP } from "./tsp";

const main = () => {
    // test parameters
    const antsCount = 200;
    const generations = 10;
    const evap = 10;
    const alpha = 2;
    const beta = 4;

    const graph: Graph = new Graph(evap, alpha, beta);
    const vertices: any[] = [
        { name: "A", x: 20833, y: 17100 },
        { name: "B", x: 20900, y: 17066 },
        { name: "C", x: 21300, y: 13016 },
        { name: "D", x: 21600, y: 14150 },
        { name: "E", x: 21600, y: 14966 },
        { name: "F", x: 21600, y: 16500 },
        { name: "G", x: 22183, y: 13133 },
        { name: "H", x: 22583, y: 14300 },
        { name: "I", x: 22683, y: 12716 },
        { name: "J", x: 23616, y: 15866 },
        { name: "K", x: 23700, y: 15933 },
        { name: "L", x: 23883, y: 14533 },
        { name: "M", x: 24166, y: 13250 },
        { name: "N", x: 25149, y: 12365 },
        { name: "O", x: 26133, y: 14500 },
        { name: "P", x: 26150, y: 10550 },
        { name: "Q", x: 26283, y: 12766 },
        { name: "R", x: 26433, y: 13433 },
        { name: "S", x: 26550, y: 13850 },
        { name: "T", x: 26733, y: 11683 },
        { name: "U", x: 27026, y: 13051 },
        { name: "V", x: 27096, y: 13415 },
        { name: "W", x: 27153, y: 13203 },
        { name: "X", x: 27166, y: 9833 },
        { name: "Y", x: 27233, y: 10450 },
        { name: "AA", x: 27266, y: 10383 },
        { name: "Z", x: 27233, y: 11783 },
        { name: "AB", x: 27433, y: 12400 },
        { name: "AC", x: 27462, y: 12992 },
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

    const tsp = new TSP(graph, antsCount, generations);
    tsp.run();
};

main();
