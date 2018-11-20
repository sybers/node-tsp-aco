import { Graph } from "../graph";
import { Ant } from "./Ant";

/**
 * The TSP class represents a Traveling Salesman Problem instance,
 * using a given graph and its parameters.
 */
export  class TSP {
    private readonly graph: Graph;
    private readonly antsNumber: number;
    private readonly generationsNumber: number;

    public constructor(graph: Graph, ants: number, generations: number) {
        this.antsNumber = ants;
        this.generationsNumber = generations;
        this.graph = graph;
    }

    /**
     * Run the TSP with ACO
     */
    public run(): number {
        let bestAnt: Ant|null = null;

        // do the ACO for the chosen number of generations with the chosen number of ants each time
        for (let i = 0; i < this.generationsNumber; i++) {
            console.log(`Generation ${i + 1} :`);

            const ants: Ant[] = this.createAnts(this.antsNumber);

            const bestAntOfGeneration: Ant|null = this.updateAntsPositions(ants);
            this.updatePheromones(ants);

            if (bestAnt === null || (bestAntOfGeneration as Ant).evaluate() < bestAnt.evaluate()) {
                bestAnt = bestAntOfGeneration;
            }

            console.log((bestAntOfGeneration as Ant).evaluate());
        }

        return (bestAnt as Ant).evaluate();
    }

    /**
     * Create a number of ants randomly initialized
     * @param amount
     */
    private createAnts(amount: number): Ant[] {
        return Array(amount).fill(0).map(() => {
            return new Ant(this.graph);
        });
    }

    /**
     * Updates the ants positions on the graph and returns the ant with the best tour score
     * @param ants
     */
    private updateAntsPositions(ants: Ant[]): Ant|null {
        let bestAnt: Ant|null = null;

        // make all ants travel on the graph one by one
        for (const ant of ants) {
            // walk the graph until all cities are visited
            // console.log(`Ant at index ${i} is now travelling\n`);
            while (!ant.isTravelFinished()) {
                // console.log(ant.getTour());
                // console.log("\n");
                ant.travel();
            }

            if (bestAnt === null || ant.evaluate() < bestAnt.evaluate()) {
                bestAnt = ant;
            }
        }
        return bestAnt;
    }

    /**
     * Update the pheromonse on the graphes for the ants that have completed their tour
     * @param ants
     */
    private updatePheromones(ants: Ant[]): void {
        for (const ant of ants) {
            this.graph.updatePheromone(ant);
        }
    }
}
