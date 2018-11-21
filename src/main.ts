#!/usr/bin/env node
"use strict";

import program from "commander";
import chalk from "chalk";
import ora from "ora";
import { Graph } from "./graph";
import interactive from "./interactive";
import { TSP } from "./tsp";

const main = async () => {
    program
        .version("0.1.0")
        .option("-i, --interactive", "Interactive mode")
        .option("-a, --ants <n>", "Number of ants", parseInt, 25)
        .option("-g, --generations <n>", "Number of generations", parseInt, 10)
        .option("-A, --alpha <a>", "Alpha value", parseInt, 1)
        .option("-B, --beta <b>", "Beta value", parseInt, 5)
        .option("-e, --evaporation <e>", "Evaporation rate", parseInt, 0.5)
        .parse(process.argv);

    /*const vertices: any[] = [
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
        { name: "Z", x: 27233, y: 11783 },
        { name: "AA", x: 27266, y: 10383 },
        { name: "AB", x: 27433, y: 12400 },
        { name: "AC", x: 27462, y: 12992 },
    ];*/

    // Oliver30 data set
    const vertices: any[] = [
        { name: "", x: 54, y: 67 },
        { name: "", x: 54, y: 62 },
        { name: "", x: 37, y: 84 },
        { name: "", x: 41, y: 94 },
        { name: "", x: 2, y: 99 },
        { name: "", x: 7, y: 64 },
        { name: "", x: 25, y: 62 },
        { name: "", x: 22, y: 60 },
        { name: "", x: 18, y: 54 },
        { name: "", x: 4, y: 50 },
        { name: "", x: 13, y: 40 },
        { name: "", x: 18, y: 40 },
        { name: "", x: 24, y: 42 },
        { name: "", x: 25, y: 38 },
        { name: "", x: 44, y: 35 },
        { name: "", x: 41, y: 26 },
        { name: "", x: 45, y: 21 },
        { name: "", x: 58, y: 35 },
        { name: "", x: 62, y: 32 },
        { name: "", x: 82, y:  7 },
        { name: "", x: 91, y: 38 },
        { name: "", x: 83, y: 46 },
        { name: "", x: 71, y: 44 },
        { name: "", x: 64, y: 60 },
        { name: "", x: 68, y: 58 },
        { name: "", x: 83, y: 69 },
        { name: "", x: 87, y: 76 },
        { name: "", x: 74, y: 78 },
        { name: "", x: 71, y: 71 },
        { name: "", x: 58, y: 69 },
    ];

    const graph: Graph = new Graph();
    // add vertices
    for (let i = 0; i < vertices.length; i++) {
        const item = vertices[i];
        graph.addVertex(i + "", item.x, item.y);
    }

    // create connections between vertices (complete graph)
    for (const v of graph.getVertices()) {
        for (const v2 of graph.getVertices()) {
            if (v !== v2) {
                graph.addEdge(v, v2);
            }
        }
    }

    const options = program.interactive ? await interactive() : program;

    const tsp = new TSP(
        graph,
        options.alpha,
        options.beta,
        options.evaporation,
        options.ants,
        options.generations,
    );

    console.log(chalk.blue("\nFinding optimum path"));
    const spinner = ora();
    spinner.start();
    const best = tsp.run((generation, bestTour) => {
        spinner.text = `Generation ${chalk.bold.cyan(generation)} of ${chalk.bold.cyan(options.generations)}, best Tour : ${chalk.red("" + bestTour)}`;
        spinner.render();
    });
    spinner.succeed(chalk.green(`Finished, best tour length is ${best.value}`));
    console.log(chalk.green(best.vertices.map((v) => v.getName()).join(" -> ")));
};

main();
