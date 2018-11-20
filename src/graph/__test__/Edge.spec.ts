import { expect } from "chai";
import "mocha";
import { Edge, Vertex } from "../index";

const createEdgeStub = () => {
    const v1: Vertex = new Vertex("A", 0, 0);
    const v2: Vertex = new Vertex("B", 1, 1);
    const edge: Edge = new Edge(v1, v2);

    return { edge, v1, v2 };
};

describe("Edge", () => {
    describe("constructor", () => {
        it("should create a valid edge between two vertices", () => {
            expect(createEdgeStub).not.to.throw();
        });
    });

    describe("getFirst", () => {
        it("should return the vertex at the first end of the edge", () => {
            const { edge, v1 } = createEdgeStub();
            expect(edge.getFirst()).to.equal(v1);
        });
    });

    describe("getSecond", () => {
        it("should return the vertex at the first end of the edge", () => {
            const { edge, v2 } = createEdgeStub();
            expect(edge.getSecond()).to.equal(v2);
        });
    });
});
