import inquirer from "inquirer";
import fs from "fs";
import InputPrompt from "inquirer/lib/prompts/input.js";

class MaxLengthInputPrompt extends InputPrompt {
    constructor(questions, rl, answers) {
        super(questions, rl, answers);
        this.maxLength = questions.maxLength || 5;
    }

    _run(callback) {
        const onKeypress = (char, key) => {
            if (
                this.rl.line.length > this.maxLength &&
                key &&
                key.name !== "backspace" &&
                key.name !== "delete"
            ) {
                this.rl.line = this.rl.line.slice(0, this.maxLength);
                this.rl.cursor = this.maxLength;
                if (typeof this.rl._refreshLine === "function") {
                    this.rl._refreshLine();
                }
                this.rl.output.write("\x07");
            }
        };

        this.rl.input.on("keypress", onKeypress);

        super._run((...args) => {
            this.rl.input.removeListener("keypress", onKeypress);
            callback(...args);
        });
    }
}

inquirer.registerPrompt("maxLengthInput", MaxLengthInputPrompt);

export async function promptUserWord() {
    const validWords = fs
        .readFileSync("validWords.txt", "utf-8")
        .split("\n")
        .map((line) => line.trim().toUpperCase())
        .filter((line) => line.length > 0);

    const questions = [
        {
            type: "maxLengthInput",
            name: "guess",
            message: "Enter guess:",
            maxLength: 5,
            transformer: (input) => input.toUpperCase(),
            validate: (input) => {
                const guess = input.trim().toUpperCase();
                if (guess.length !== 5) {
                    return "Guess must be exactly 5 characters long.";
                }
                if (!validWords.includes(guess)) {
                    return "That is not a valid word.";
                }
                return true;
            },
            filter: (input) => input.trim().toUpperCase(),
        },
    ];

    const answers = await inquirer.prompt(questions);
    return answers.guess;
}
