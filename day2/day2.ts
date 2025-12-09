import { readFile } from "../utils/fileutils";

interface Range{
    start: number;
    end: number;
}

export function isValidId(id: number): boolean {
    const cleanedId = id.toString()

    if (cleanedId.length === 0) return true;

    for (let maskIndex = 1; maskIndex <= cleanedId.length / 2; maskIndex++) {
        const mask = cleanedId.slice(0, maskIndex)

        if (cleanedId.length % mask.length !== 0) continue;

        const repeatedMask = mask.repeat(cleanedId.length / mask.length);

        if (repeatedMask === cleanedId) return false;
    }

    return true;
}

export function findInvalidIdsInRange(range: Range): number[] {
    const invalidIds: number[] = [];

    for (let id = range.start; id <= range.end; id++) {
        if (!isValidId(id)) {
            invalidIds.push(id);
        }
    }

    return invalidIds;
}

export function parseRange(rangeString: string): Range {
    const [startString, endString] = rangeString.split("-");

    return {
        start: parseInt(startString, 10),
        end: parseInt(endString, 10),
    };
}

export function calculateInvalidIdSum(ranges: Range[]): number {
    const invalidIds = ranges.map(findInvalidIdsInRange).flat();

    return invalidIds.reduce((sum, id) => sum + id, 0);
}

async function day2() {
    readFile('day2/day2.input.txt').then((data) => {
        const ranges = data.split(',').map(rangeStr => parseRange(rangeStr));

        const invalidIdSum = calculateInvalidIdSum(ranges);
        
        console.log(`Sum of invalid IDs: ${invalidIdSum}`);
    });
}

day2();