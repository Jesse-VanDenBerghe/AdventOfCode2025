import { readFile } from "../utils/fileutils.ts";
import { testCase, assert, testCaseAsync } from "../utils/testutils.ts";
import { isValidId, findInvalidIdsInRange, parseRange, calculateInvalidIdSum } from "./day2.ts";

async function runTests() {

    testCase("check valid Ids", () => {
        const validIds = ["0", "1", "123", "4567", "89012", "0101"];

        for (const id of validIds) {
            const result = isValidId(Number(id));

            assert(result === true, `Expected id ${id} to be valid`);
        }
    });

    testCase("check invalid Ids", () => {
        const invalidIds = ["11", "22", "1010", "1188511885"];

        for (const id of invalidIds) {
            const result = isValidId(Number(id));

            assert(result === false, `Expected id ${id} to be invalid`);
        }
    });

    testCase("check ranges", () => {
        const cases = [
            { range: { start: 0, end: 22 }, expectedInvalidIds: [11, 22] },
            { range: { start: 1000, end: 1500 }, expectedInvalidIds: [1010, 1111, 1212, 1313, 1414] },
        ];

        for (const testCaseData of cases) {
            const invalidIds = findInvalidIdsInRange(testCaseData.range);
            const expectedIds = testCaseData.expectedInvalidIds;

            assert(
                JSON.stringify(invalidIds) === JSON.stringify(expectedIds),
                `Expected invalid IDs in range ${testCaseData.range.start}-${testCaseData.range.end} to be ${expectedIds}, got ${invalidIds}`
            );
        }
    });

    testCaseAsync("calculateInvalidIdSum with example input", async () => {
        readFile('day2/day2-test.input.txt').then((data) => {
            const ranges = data.split(',').map(rangeStr => parseRange(rangeStr));

            const invalidIdSum = calculateInvalidIdSum(ranges);

            assert(invalidIdSum === 1227775554, `Expected sum of invalid IDs to be 1227775554, got ${invalidIdSum}`);
        });
    });
}

runTests();