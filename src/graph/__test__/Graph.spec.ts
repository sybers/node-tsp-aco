import { expect } from "chai";
import "mocha";
import { Graph } from "../index";

describe("Graph", () => {
    describe("isEmpty", () => {
        it("should return true if the graph is empty", () => {
            const emptyGraph = new Graph(0.1, 1, 1);
            expect(emptyGraph.isEmpty()).to.be.true;
        });

        it("should return false if the graph has some elements", () => {
            const graph = new Graph(0.1, 1, 1);
            graph.addVertex("name", 0, 0);
            expect(graph.isEmpty()).to.be.false;
        });
    });

    describe("getTotalVertices", () => {
        it("should return the total number of vertices in the graph", () => {
            const g = new Graph(0.1, 1, 1);
            expect(g.getTotalVertices()).to.equal(0);

            const g2 = new Graph(0.1, 1, 1);
            g2.addVertex("A", 0, 0);
            g2.addVertex("B", 1, 1);
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

            const v1 = g2.addVertex("A", 0, 0);
            const v2 = g2.addVertex("B", 1, 1);

            g2.addEdge(v1, v2);
            expect(g2.getTotalEdges()).to.equal(1);
        });

        it("should skip an edge that already exists", () => {
            const g = new Graph(0.1, 1, 1);

            const v1 = g.addVertex("A", 0, 0);
            const v2 = g.addVertex("B", 1, 1);

            g.addEdge(v1, v2);

            // as the graph is not oriented, creating the same edge the other way won't do anything...
            g.addEdge(v2, v1);
            expect(g.getTotalEdges()).to.equal(1);
        });
    });

    describe("getEdgesForVertex", () => {
        it("should return the edges connected to a vertex", () => {
            const g = new Graph(0.1, 1, 1);

            const a = g.addVertex("A", 0, 0);
            const b = g.addVertex("B", 0, 1);
            const c = g.addVertex("C", 1, 0);
            const d = g.addVertex("D", 1, 1);

            g.addEdge(a, b);
            g.addEdge(a, c);
            g.addEdge(b, c);
            g.addEdge(c, d);

            expect(g.getEdgesForVertex(a).length).to.equal(2);
        });
    });
});
