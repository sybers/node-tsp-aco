import Ant from "./Ant";
import Graph from "../Graph";

export default class TSP {
    private graph: Graph;
    private antsNumber: number;
    private generationsNumber: number;

    public constructor(ants: number, generations: number, evaporation: number, alpha: number, beta: number) {
        this.antsNumber = ants;
        this.generationsNumber = generations;
        this.graph = new Graph(evaporation, alpha, beta);
    }

    public run(): void {

    }
}
