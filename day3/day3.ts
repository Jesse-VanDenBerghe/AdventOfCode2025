import { readFile } from "../utils/fileutils";

export function maxJoltageForBank(bank: String): number {
    const joltages = bank.split('').map(char => parseInt(char, 10));

    const maxJoltage = Math.max(...joltages.slice(0, joltages.length - 1));
    const maxJoltageIndex = joltages.indexOf(maxJoltage);

    const otherOptions = joltages.slice(maxJoltageIndex + 1, joltages.length );
    const maxSecondJoltage = Math.max(...otherOptions);

    return maxJoltage * 10 + maxSecondJoltage;
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