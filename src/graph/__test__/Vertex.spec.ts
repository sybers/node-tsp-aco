import { expect } from "chai";
import "mocha";
import { Vertex } from "../index";

const createVertexStub = () => new Vertex("A", 0, 0);

describe("Vertex", () => {
    it("should return its name", () => {
        const v1 = createVertexStub();

        expect(v1.getName()).to.equal("A");
    });

    it("should be able to edit its name", () => {
        const v1 = createVertexStub();
        v1.setName("X");

        expect(v1.getName()).to.equal("X");
    });

    it("should return its coordinates", () => {
        const vertex = createVertexStub();

        expect(vertex.getX()).to.equal(0);
        expect(vertex.getY()).to.equal(0);
    });

    it("should be able to edit its coordinates", () => {
        const vertex = createVertexStub();
        vertex.setX(12);
        vertex.setY(21);

        expect(vertex.getX()).to.equal(12);
        expect(vertex.getY()).to.equal(21);
    });
});
