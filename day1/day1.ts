import { Logger } from '../utils/logger.js';
import fs from 'fs/promises';

const logger = new Logger(false);

export class Rotation {
    constructor(
        public code: string,
        public direction: "left" | "right",
        public distance: number
    ) { }

    static fromCode(code: string): Rotation {
        const directionChar = code.charAt(0);
        const distanceString = code.slice(1);
        const distance = parseInt(distanceString, 10);

        if (directionChar !== "L" && directionChar !== "R") {
            throw new Error("Invalid direction character in rotation code");
        }

        const direction = directionChar === "L" ? "left" : "right";
        return new Rotation(code,direction, distance);
    }

    rotationValue(): number {
        return this.direction === "left" ? -this.distance : this.distance;
    }

    asReadableString(): string {
        return `${this.direction.toUpperCase()}${this.distance}`;
    }

}

export class Dial {
    constructor(
        public currentNumber: number = 50,
        private readonly dialMin: number = 0,
        private readonly dialMax: number = 100
    ) {
        logger.log(`The dial starts by pointing at ${this.currentNumber}`);
     }

    rotate(rotation: Rotation): {newNumber:number, passedZero: number} {
        const startNumber = this.currentNumber;
        const rotationAmount = this.currentNumber + rotation.rotationValue();

        this.currentNumber = ((rotationAmount % this.dialMax) + this.dialMax) % this.dialMax;
        
        let passedZero = Math.abs(Math.floor(rotationAmount / this.dialMax));

        if (rotation.direction === "left" && startNumber == 0) {
            passedZero--;
        }
        if (rotation.direction === "right" && this.currentNumber == 0) {
            passedZero--;
        }

        logger.log(`Rotating ${rotation.asReadableString()} from ${startNumber} to ${this.currentNumber}, passed zero ${passedZero} times`);

        return { newNumber: this.currentNumber, passedZero };
    }
}

export function decryptPassword(dial: Dial = new Dial(), rotations: Rotation[]): number {
    let password: number = 0;

    for (let rotation of rotations) {
        const { newNumber , passedZero} = dial.rotate(rotation);
        if (newNumber === 0) password++;
    }

    return password;
}

export function decryptPasswordUsingMethod0x434C49434B(dial: Dial = new Dial(), rotations: Rotation[]): number {
    let password: number = 0;

    for (let rotation of rotations) {
        const { newNumber , passedZero} = dial.rotate(rotation);
        if (newNumber === 0) password++;
        password += passedZero;
    }

    return password;
}


export async function parseRotationsFromInputFile(file: string): Promise<Rotation[]> {
    const input: string[] = await fs.readFile(file, 'utf-8')
        .then(data => data.split('\n').filter(line => line.trim().length > 0));

    const rotations: Rotation[] = input.map(line => Rotation.fromCode(line));
    return rotations;
}

export async function part1(): Promise<number> {
    const rotations: Rotation[] = await parseRotationsFromInputFile('./day1/day1.input.txt');
    const password = decryptPassword(new Dial(50), rotations);

    console.log(`Password: ${password}`);
    return password;
}

async function part2(): Promise<number> {
    const rotations: Rotation[] = await parseRotationsFromInputFile('./day1/day1.input.txt');

    const password = decryptPasswordUsingMethod0x434C49434B(new Dial(50), rotations);

    console.log(`Password (0x434C49434B method): ${password}`);
    return password;
}

part2();