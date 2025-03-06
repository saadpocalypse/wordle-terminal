import fs from "fs";
import crypto from "crypto";

export function pickWord(salt = "default-salt") {
    const today = new Date().toISOString().slice(0, 10);
    const input = today + salt;

    const hash = crypto.createHash("sha256").update(input).digest("hex");

    const hashNum = parseInt(hash.slice(0, 8), 16);

    const index = hashNum % 2309;

    const words = fs
        .readFileSync("words.txt", "utf-8")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    return words[index];
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
    console.log(`Today's word is: ${pickWord()}`);
}
