#!/usr/bin/env node
import chalk from "chalk";
import { pickWord } from "./wordPicker.js";
import { promptUserWord } from "./userInput.js";
import { formatGuess } from "./formatGuess.js";

console.clear();
console.log(chalk.green("Welcome to Terminal Wordle!\n"));

const todaysWord = pickWord().toUpperCase();

async function runGame() {
    const maxGuesses = 6;
    for (let attempt = 1; attempt <= maxGuesses; attempt++) {
        console.log(chalk.yellow(`\nAttempt ${attempt} of ${maxGuesses}`));
        const guess = await promptUserWord();

        process.stdout.write("\x1B[1A\x1B[2K");
        process.stdout.write("\x1B[1A\x1B[2K");

        const coloredGuess = formatGuess(guess, todaysWord);
        console.log(coloredGuess);

        if (guess === todaysWord) {
            console.log(chalk.green("\nYou won!"));
            return;
        }
    }

    console.log(chalk.red("\nSorry, you lost."));
    console.log(`Today's word was: ${todaysWord}`);
}

runGame();
