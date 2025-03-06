import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wordsPath = path.join(__dirname, "words.txt");

export function pickWord(salt = "default-salt") {
    const today = new Date();
    const localDate = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    const input = localDate + salt;

    const hash = crypto.createHash("sha256").update(input).digest("hex");
    const hashNum = parseInt(hash.slice(0, 8), 16);
    const index = hashNum % 2315;

    const words = fs
        .readFileSync(wordsPath, "utf-8")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    return words[index];
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
    console.log(`Today's word is: ${pickWord()}`);
}
