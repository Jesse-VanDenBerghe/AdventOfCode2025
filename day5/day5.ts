import { readFile } from '../utils/fileutils.ts';

function isFresh(id: number, freshIds: string[]): boolean {
    return freshIds.some(range => isInRange(id, range));
}

function isInRange(id: number, range: string): boolean {
    const [start, end] = range.split('-').map(Number);
    return id >= start && id <= end;
}

function countFreshIdsInRange(ranges: string[], ids: number[]): number {
    let count = 0;
    for (const id of ids) {
        if (isFresh(id, ranges)) {
            count++;
        }
    }
    return count;
}

function countFreshIds(freshRanges: string[]): number {
    const sortedRanges = freshRanges.sort((a, b) => {
        const [startA] = a.split('-').map(Number);
        const [startB] = b.split('-').map(Number);
        return startA - startB;
    });

    const mergedRanges: string[] = [];
    for (const rangeStr of sortedRanges) {
        const [start, end] = rangeStr.split('-').map(Number);

        if (mergedRanges.length === 0) {
            mergedRanges.push(rangeStr);
            continue;
        }

        const lastRangeStr = mergedRanges[mergedRanges.length - 1];
        const [lastStart, lastEnd] = lastRangeStr.split('-').map(Number);

        if (start <= lastEnd + 1) {
            //overlap or contiguous
            const newEnd = Math.max(end, lastEnd);
            mergedRanges[mergedRanges.length - 1] = `${lastStart}-${newEnd}`;
        } else {
            mergedRanges.push(rangeStr);
        }
    }

    let totalCount = 0;
    for (const rangeStr of mergedRanges) {
        const [start, end] = rangeStr.split('-').map(Number);
        totalCount += (end - start + 1);
    }

    return totalCount;
}


function day5() {
    readFile('day5/day5.input.txt').then((data) => {
        const [rangesString, idsString] = data.split('\n\n')

        const freshRanges = rangesString.split('\n')
        const ids = idsString.split('\n').map(Number);

        const totalFreshIds = countFreshIdsInRange(freshRanges, ids);

        console.log(`Total valid IDs: ${totalFreshIds}`);

        const allFreshIdsCount = countFreshIds(freshRanges);

        console.log(`All fresh IDs count: ${allFreshIdsCount}`);
    });
}

day5();