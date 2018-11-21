import inquirer from "inquirer";

/**
 * Interactive mode questions
 */
const questions: inquirer.Questions = [
    {
        default: 25,
        filter: Number,
        message: "Number of ants ?",
        name: "ants",
        type: "input",
        validate: (val) => val > 0,
    },
    {
        default: 10,
        filter: Number,
        message: "Number of generations ?",
        name: "generations",
        type: "input",
        validate: (val) => val > 0,
    },
    {
        default: 1,
        filter: Number,
        message: "Alpha value ?",
        name: "alpha",
        type: "input",
        validate: (val) => val > 0,
    },
    {
        default: 5,
        filter: Number,
        message: "Beta value ?",
        name: "beta",
        type: "input",
        validate: (val) => val > 0,
    },
    {
        default: 0.5,
        filter: Number,
        message: "Evaporation rate ?",
        name: "evaporation",
        type: "input",
        validate: (val) => val >= 0 && val <= 1,
    },
];

/**
 * Start the interactive mode and return the user's input
 */
export default async (): Promise<inquirer.Answers> => {
    return await inquirer
        .prompt(questions);
};
