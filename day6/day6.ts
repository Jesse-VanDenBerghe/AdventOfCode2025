import { readFile } from '../utils/fileutils.js';

function add(a: number, b: number): number {
    return a + b;
}

function multiply(a: number, b: number): number {
    return a * b;
}

function solveColumn(data: string[]): number {
    if (data.length === 0) {
        console.log('No data in column to solve.');
        return 0;
    }

    const operatorString: string = data[0];
    const numbers: string[] = data.slice(1);

    const operatorChar = operatorString[0];

    const operator = operatorChar === '+' ? add : multiply;
    const startValue = operatorChar === '+' ? 0 : 1;

    const output = numbers
        .map((number) =>
            Number(number.trim())
        )
        .reduce((acc, num) =>
            operator(acc, num), startValue
        );

    return output;
}

function parseMatrix(input: string): string[][] {
    const charMatrix = input.split('\n').map(line => line.split('').reverse());

    const operators = charMatrix.pop();

    const matrix: string[][] = [];
    let currentRow: string[] = [];

    operators?.reverse().forEach((char, index) => {

        if (char == '*' || char == '+') {
            currentRow.pop();
            matrix.push(currentRow);
            currentRow = [char];
        }

        let readableLine: string = ""

        charMatrix.forEach((line) => {
            readableLine += line.pop() || '0';
        });


        if( index === operators.length -1 ) {
            matrix.push(currentRow);
        }

        currentRow.push(readableLine);
    });

    return matrix;
}

function printMatrix(matrix: string[][]) {
    matrix.forEach(row => {
        console.log(row.join('\t'));
    });
}

async function day6() {
    readFile('day6/day6.input.txt').then((data) => {
        const matrix = parseMatrix(data);

        printMatrix(matrix);

        const results = matrix.map(column => solveColumn(column));

        const finalSum = results.reduce((sum, val) => sum + val, 0);

        console.log(`Final sum of all lines: ${finalSum}`);
    });
}

day6();