# TSP solver using Ant Colony Optimization

This project is a **Node.js** implementation of the **Ant System algorithm** proposed by M. Dorigo et al.

The main goal of this project was to produce a functional implementation of this algorithm and to test it against real world data to compare performance and accuracy of the algorithm.

> There's also a **Go** implementation available [here](https://github.com/dzetah/go-tsp-aco)!

## Installation

Clone this repository and move to the sources directory

```console
$ git clone https://github.com/dzetah/node-tsp-aco.git node-tsp-aco
$ cd node-tsp-aco
```

Install dependencies

```
$ npm i
```

Transpile Typescript sources

```
$ npm run build
```

Run the TSP solver ! 🚀

```
$ node ./build/main.js
```

## Usage

The following flags are available :
- `-i`, `--interactive` : Interactive mode.
- `-a`, `--ants <value>` : Number of ants (default `25`).
- `-A`, `--alpha <value>` : Alpha value (default `1`).
- `-B`, `--beta <value>` : Beta value (default `5`).
- `-g`, `--generations <value>` : Number of generations (default `10`).
- `-e`, `--evaporation <value>` Evaporation rate (default `0.5`).
- `-h`, `--help` : displays the help message.

The **Node.js** version is not yet able to read `.tsp` files and uses the [Oliver30 dataset](https://stevedower.id.au/blog/research/oliver-30/) by default.

## Licence

[MIT](/LICENSE.md)
