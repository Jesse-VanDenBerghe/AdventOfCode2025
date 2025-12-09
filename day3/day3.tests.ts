import { readFile } from "../utils/fileutils";
import { testCase, assert, testCaseAsync } from "../utils/testutils";
import { maxJoltageForBank, maxJoltageForBanks } from "./day3";

async function runTests() {
    testCase("maxJoltageTests", () => {
        const cases = [
            { bank: "123456789098", expected: 99 },
            { bank: "811111111111119", expected: 89 },
            { bank: "0000000000", expected: 0 },
            { bank: "111191111111211", expected: 92 },
        ];

        cases.forEach(({ bank, expected }, index) => {
            const result = maxJoltageForBank(bank);
            assert(result === expected, `Test case ${bank}: expected ${expected}, got ${result}`);
        });
    });

    testCase("maxJoltageForBanks", () => {
        const banks = [
            "123456789098",
            "811111111111119",
            "0000000000",
            "111191111111211",
        ];

        const expectedTotal = 99 + 89 + 0 + 92; // 280
        const result = maxJoltageForBanks(banks);

        assert(result === expectedTotal, `Expected total joltage to be ${expectedTotal}, got ${result}`);
    });

    testCaseAsync("maxJoltageForBankTestInput", async () => {
        readFile('day3-test.input.txt').then((data) => {
            const banks = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);

            const totalJoltage = maxJoltageForBanks(banks);

            assert(totalJoltage === 357, `Expected total joltage to be 357, got ${totalJoltage}`);
        });
    });
}

runTests();