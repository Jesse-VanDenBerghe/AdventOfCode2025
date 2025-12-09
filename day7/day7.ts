import path from 'path';
import { readFile } from '../utils/fileutils.js';

const start = 'S'
const split = '^'
const beam = '|'

function parseImage(input: string): string[][]{
    return input.split('\n').map(line => line.split(''));
}

function printImage(image: string[][]){
    image.forEach(line => {
        console.log(line.join(''));
    });
}

function drawImage(image: string[][]){
    const startCoord = findStartCoord(image);

    drawBream(image, startCoord.x, startCoord.y + 1);
}

function countTimelines(image: string[][]){
    const startCoord = findStartCoord(image);
    const timelineMap: Map<string, number> = new Map();

    const key = `${startCoord.x},${startCoord.y}`;
    timelineMap.set(key, 1);

    for (let y = 1; y < image.length; y++) {
        for (let x = 0; x < image[0].length; x++) {
            const char = image[y][x];

            if( char === split ) {
                splitTimeline(x, y, timelineMap);
                continue;
            }

            if( char === beam ) {
                continueTimeline(x, y, timelineMap);
            }
        }
    }

    let total = countActiveTimelines(image, timelineMap);
    
    return total;
}

function countActiveTimelines(image: string[][], pathMap: Map<string, number>) {
    let total = 0;
    for (let x = 0; x < image[0].length; x++) {
        const key = `${x},${image.length - 1}`;
        total += pathMap.get(key) || 0;
    }
    return total;
}

function continueTimeline(x: number, y: number, pathMap: Map<string, number>) {
    const currentKey = `${x},${y}`;
    const currentCount = pathMap.get(currentKey) || 0;

    const aboveKey = `${x},${y - 1}`;
    const aboveCount = pathMap.get(aboveKey) || 0;

    pathMap.set(currentKey, currentCount + aboveCount);
}

function splitTimeline(x: number, y: number, pathMap: Map<string, number>) {
    const aboveKey = `${x},${y - 1}`;
    const aboveCount = pathMap.get(aboveKey) || 0;

    const leftKey = `${x - 1},${y}`;
    const leftCount = pathMap.get(leftKey) || 0;
    pathMap.set(leftKey, aboveCount + leftCount);

    const rightKey = `${x + 1},${y}`;
    const rightCount = pathMap.get(rightKey) || 0;
    pathMap.set(rightKey, aboveCount + rightCount);
}

function findStartCoord(image: string[][]): {x: number, y: number}{
    const x = image[0].indexOf(start);
    const y = 0;

    return {x, y};
}

function drawBream(image: string[][], x: number, y: number, visited = new Set<string>()){
    if( y >= image.length || y < 0 || x < 0 || x >= image[0].length ) return;

    const key = `${x},${y}`;
    if(visited.has(key)) return;
    visited.add(key);

    const char = image[y][x];

    if( char === split ) {
        drawBream(image, x -1, y, visited);
        drawBream(image, x +1, y, visited);
        return;
    }

    image[y][x] = beam;

    drawBream(image, x, y +1, visited);
}

async function day7() {
    readFile('day7/day7.input.txt').then((data) => {
        const image = parseImage(data);

        drawImage(image);

        printImage(image);

        const result = countTimelines(image);
        console.log(`Result: ${result}`);
    });
}

day7();