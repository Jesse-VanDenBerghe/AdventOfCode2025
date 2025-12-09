import { readFile } from "../utils/fileutils";
import { Logger } from "../utils/logger";

const logger = new Logger(false);

export function maxJoltageForBank(bank: String): number {
    const joltages = bank.split('').map(char => parseInt(char, 10));
    const maxEnabledBatteries = 12;

    let options = joltages;
    let totalJoltage = "";

    for (let i = maxEnabledBatteries - 1; i >= 0; i--) {
        const maxJoltage = Math.max(...options.slice(0, options.length - i));
        const maxJoltageIndex = options.indexOf(maxJoltage);

        totalJoltage += maxJoltage.toString();

        logger.log(`(${i}) -> Options: ${options} | Max Joltage: ${maxJoltage} | Total Joltage: ${totalJoltage}`);

        options = options.slice(maxJoltageIndex + 1);
    }

    return parseInt(totalJoltage, 10) || 0 ;
}

export function maxJoltageForBanks(banks: String[]): number {
    const totalJoltage = banks
        .map(maxJoltageForBank)
        .reduce((currentMax, joltage) => {
            return currentMax += joltage;
        }, 0);

    return totalJoltage;
}

async function day3(){
    readFile('day3.input.txt').then((data) => {
        const banks = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        const totalJoltage = maxJoltageForBanks(banks);
        
        console.log(`Total joltage: ${totalJoltage}`);
    });
}

day3();