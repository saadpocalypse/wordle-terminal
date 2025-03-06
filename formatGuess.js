import chalk from "chalk";

export function formatGuess(guess, word) {
    const result = Array(guess.length).fill("");

    const letterCounts = {};
    for (const letter of word) {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === word[i]) {
            result[i] = chalk.green(guess[i]);
            letterCounts[guess[i]]--;
        }
    }

    for (let i = 0; i < guess.length; i++) {
        if (result[i] === "") {
            if (letterCounts[guess[i]] > 0) {
                result[i] = chalk.yellow(guess[i]);
                letterCounts[guess[i]]--;
            } else {
                result[i] = chalk.grey(guess[i]);
            }
        }
    }

    return result.join("");
}
