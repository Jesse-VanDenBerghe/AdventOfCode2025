import { log } from 'console';
import { readFile } from '../utils/fileutils.js';
import { Logger } from '../utils/logger.js';

const rollOfPaper = '@';
const logger = new Logger(true);

function countSurroundingValues(grid: Set<string>, coordString: string): number {
    let count = 0;
    const [x, y] = coordString.split(',').map(Number);
    for (let deltaY = -1; deltaY <= 1; deltaY++) {
        for (let deltaX = -1; deltaX <= 1; deltaX++) {
            if (deltaX === 0 && deltaY === 0) continue;
            if (grid.has(`${x + deltaX},${y + deltaY}`)) {
                count++;
            }
        }
    }
    return count;
}

function rollIsAccessible(grid: Set<string>, coordString: string): boolean {
    if (!grid.has(coordString)) return false;

    const surroundingRolls = countSurroundingValues(grid, coordString);
    return surroundingRolls <= 3;
}

function parseGrid(input: string): Set<string> {
    const newGrid: Set<string> = new Set();
    const lines = input.split('\n');
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            if (line[x] === rollOfPaper) {
                newGrid.add(`${x},${y}`);
            }
        }
    }
    return newGrid;
}

async function day4() {
    readFile('day4/day4.input.txt').then((data) => {
        const parsedGrid = parseGrid(data);

        let remaining = new Set<string>(parsedGrid);

        let totalAccessibleCount = 0;
        let rollsRemovedInThisPass = 0;

        do {
            rollsRemovedInThisPass = 0;

            const snapshot = new Set(remaining);

            for (const coord of snapshot) {
                if (rollIsAccessible(snapshot, coord)) {
                    rollsRemovedInThisPass++;
                    remaining.delete(coord);
                }
            }

            totalAccessibleCount += rollsRemovedInThisPass;

        } while (rollsRemovedInThisPass > 0);

        console.log(`Number of accessible rolls of paper: ${totalAccessibleCount}`);
    });
}

day4();
