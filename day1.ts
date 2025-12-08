import fs from 'fs/promises';

class Rotation {
    constructor(
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
        return new Rotation(direction, distance);
    }

    rotationValue(): number {
        return this.direction === "left" ? -this.distance : this.distance;
    }

    asReadableString(): string {
        return `${this.direction.toUpperCase()}${this.distance}`;
    }

}

class Dial {
    constructor(
        public currentNumber: number = 50,
        private readonly dialMin: number = 0,
        private readonly dialMax: number = 100
    ) { }

    rotate(rotation: Rotation): number {
        let logString = `${this.currentNumber} + ${rotation.asReadableString()}`;

        this.currentNumber = ((this.currentNumber + rotation.rotationValue()) % this.dialMax + this.dialMax) % this.dialMax;

        logString += ` = ${this.currentNumber}`;
        console.log(logString);

        return this.currentNumber;
    }

    isAtZero(): boolean {
        return this.currentNumber === 0;
    }
}

function decryptPassword(rotations: Rotation[]): number {
    const dial: Dial = new Dial();
    let password: number = 0;

    for (let rotation of rotations) {
        dial.rotate(rotation);
        if (dial.isAtZero()) password++;
    }

    return password;
}

async function day1() {
    const input: string[] = await fs.readFile('./inputs/day1.txt', 'utf-8')
        .then(data => data.split('\n').filter(line => line.trim().length > 0));

    const rotations: Rotation[] = input.map(line => Rotation.fromCode(line));
    const password = decryptPassword(rotations);

    console.log(`Password: ${password}`);
}

day1();