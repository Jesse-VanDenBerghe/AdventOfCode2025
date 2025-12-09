import { readFile } from '../utils/fileutils.ts';

function freshDict(ranges: string[]): { [key: number]: boolean } {
    const idDict: { [key: number]: boolean } = {};

    ranges.forEach(range => {
        const [start, end] = range.split('-').map(Number);
        for (let i = start; i <= end; i++) {
            idDict[i] = true;
        }
    });

    return idDict;
}

function isFresh(id: number, freshIds: string[]): boolean {
    return freshIds.some(range => isInRange(id, range));
}

function isInRange(id: number, range: string): boolean {
    const [start, end] = range.split('-').map(Number);
    return id >= start && id <= end;
}

function day5() {
    readFile('day5/day5.input.txt').then((data) => {
        const [ranges, ids] = data.split('\n\n')

        const freshRanges = ranges.split('\n')
        
        let totalValidIds = 0;
        ids.split('\n').forEach(idStr => {
            const id = Number(idStr);
            if (isFresh(id, freshRanges)) {
                totalValidIds++;
            }
        });
        
        console.log(`Total valid IDs: ${totalValidIds}`);
    });
}

day5();