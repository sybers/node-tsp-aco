import { expect } from "chai";
import "mocha";
import Graph from "../Graph";
import Vertex from "../Vertex";
import Edge from "../Edge";

describe("Graph", () => {
    describe("isEmpty", () => {
        it("should return true if the graph is empty", () => {
            const emptyGraph = new Graph(0.1, 1, 1);
            expect(emptyGraph.isEmpty()).to.be.true;
        });

        it("should return false if the graph has some elements", () => {
            const graph = new Graph(0.1, 1, 1);
            graph.addVertex(new Vertex("name", 0, 0));
            expect(graph.isEmpty()).to.be.false;
        });
    });

    describe("getTotalVertices", () => {
        it("should return the total number of vertices in the graph", () => {
            const g = new Graph(0.1, 1, 1);
            expect(g.getTotalVertices()).to.equal(0);

            const g2 = new Graph(0.1, 1, 1);
            g2.addVertex(new Vertex("A", 0, 0));
            g2.addVertex(new Vertex("B", 1, 1));
            expect(g2.getTotalVertices()).to.equal(2);
        });
    });

    describe("getTotalEdges", () => {
        it("should return the total number of edges on the graph", () => {
            // empty graph has no edges
            const g = new Graph(0.1, 1, 1);
            expect(g.getTotalEdges()).to.equal(0);

            // a graph with one edge
            const g2 = new Graph(0.1, 1, 1);
            const v1: Vertex = new Vertex("A", 0, 0);
            const v2: Vertex = new Vertex("B", 1, 1);

            g2.addVertex(v1);
            g2.addVertex(v2);

            g2.addEdge(new Edge(v1, v2));
            expect(g2.getTotalEdges()).to.equal(1);
        });

        it("should skip an edge that already exists", () => {
            const g = new Graph(0.1, 1, 1);
            const v1: Vertex = new Vertex("A", 0, 0);
            const v2: Vertex = new Vertex("B", 1, 1);

            g.addVertex(v1);
            g.addVertex(v2);

            g.addEdge(new Edge(v1, v2));
            g.addEdge(new Edge(v2, v1)); // creating the same edge in the other way !
            expect(g.getTotalEdges()).to.equal(1);
        });
    });
});
