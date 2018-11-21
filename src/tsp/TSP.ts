import { Graph, Vertex } from "../graph";
import { Ant } from "./Ant";

/**
 * The TSP class represents a Traveling Salesman Problem instance,
 * using a given graph and its parameters.
 */
export  class TSP {
    private readonly graph: Graph;
    private readonly alpha: number;
    private readonly beta: number;
    private readonly evaporationRate: number;
    private readonly antsNumber: number;
    private readonly generationsNumber: number;

    public constructor(
        graph: Graph,
        alpha: number,
        beta: number,
        evaporationRate: number,
        ants: number,
        generations: number,
    ) {
        if (alpha < 0) {
            throw new Error("alpha parameter must be >= 0");
        }

        if (beta < 0) {
            throw new Error("alpha parameter must be >= 0");
        }

        if (evaporationRate > 1 || evaporationRate < 0) {
            throw new Error("EvaporationRate parameter must be >= 0 and <= 1");
        }

        if (ants <= 0) {
            throw new Error("ants parameter must be greater than 0");
        }

        if (generations <= 0) {
            throw new Error("generations parameter must be greater than 0");
        }

        this.alpha = alpha;
        this.beta = beta;
        this.evaporationRate = evaporationRate;
        this.antsNumber = ants;
        this.generationsNumber = generations;
        this.graph = graph;
    }

    /**
     * Run the TSP with ACO
     */
    public run(generationFinishedHandler?: (generation: number, bestTour: number) => void):
        { value: number, vertices: Vertex[] } {
        let bestAnt: Ant|null = null;

        // do the ACO for the chosen number of generations with the chosen number of ants each time
        for (let i = 0; i < this.generationsNumber; i++) {
            const ants: Ant[] = this.createAnts(this.antsNumber);

            const bestAntOfGeneration: Ant|null = this.updateAntsPositions(ants);
            this.updateAllPheromones(ants);

            if (bestAnt === null || bestAntOfGeneration!.evaluate() < bestAnt.evaluate()) {
                bestAnt = bestAntOfGeneration;
            }

            // callback
            if (generationFinishedHandler) {
                generationFinishedHandler(i + 1, bestAntOfGeneration!.evaluate());
            }
        }

        return {
            value: bestAnt!.evaluate(),
            vertices: bestAnt!.getTour(),
        };
    }

    /**
     * Create a number of ants randomly initialized
     * @param amount
     */
    private createAnts(amount: number): Ant[] {
        return Array(amount).fill(0).map(() => {
            return new Ant(this.graph, this.alpha, this.beta);
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
            while (!ant.isTravelFinished()) {
                ant.travel();
            }

            if (bestAnt === null || ant.evaluate() < bestAnt.evaluate()) {
                bestAnt = ant;
            }
        }
        return bestAnt;
    }

    /**
     * Update the pheromonse on the graph for the ants that have completed their tour
     * @param ants
     */
    private updateAllPheromones(ants: Ant[]): void {
        for (const ant of ants) {
            this.updatePheromones(ant);
        }
    }

    /**
     * Update the pheromones of a single ant
     * @param ant
     */
    private updatePheromones(ant: Ant): void {
        const tour: Vertex[] = ant.getTour();
        const tourLength: number = ant.evaluate();

        // update pheromones for every edges on the tour
        for (let i = 1; i < tour.length; i++) {
            const edge = this.graph.getEdgeBetweenVertices(tour[i - 1], tour[i]);

            if (edge !== undefined) {
                const currentPheromones: number = edge.getPheromone();

                const newValue = ( 1 - this.evaporationRate) * currentPheromones + 1 / tourLength;

                edge.setPheromone(newValue);
            }
        }
    }
}
