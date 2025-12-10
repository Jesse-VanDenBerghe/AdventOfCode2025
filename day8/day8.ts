import { readFile } from "../utils/fileutils";

class Vector {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static fromString(s: string): Vector {
        const [x, y, z] = s.split(',').map(Number);
        return new Vector(x, y, z);
    }

    asKey(): string {
        return `${this.x},${this.y},${this.z}`;
    }
}

function distance(v1: Vector, v2: Vector): number {
    return Math.sqrt(
        Math.pow(v2.x - v1.x, 2) +
        Math.pow(v2.y - v1.y, 2) +
        Math.pow(v2.z - v1.z, 2)
    );
}

function calculatePossibleConnections(vectors: Vector[]): Map<string, number> {
    const connections = new Map<string, number>();

    for (let i = 0; i < vectors.length; i++) {
        for (let j = i + 1; j < vectors.length; j++) {
            const dist = distance(vectors[i], vectors[j]);
            const key1 = vectors[i].asKey();
            const key2 = vectors[j].asKey();

            connections.set(`${key1}-${key2}`, dist);
        }
    }

    return connections;
}

function popClosestConnection(connections: Map<string, number>): [string, number] | null {
    let closestKey: string | null = null;
    let closestDistance = Infinity;

    for (const [key, dist] of connections.entries()) {
        if (dist < closestDistance) {
            closestDistance = dist;
            closestKey = key;
        }
    }

    if (closestKey !== null) {
        connections.delete(closestKey);
        return [closestKey, closestDistance];
    }

    return null;
}

function makeXConnections(vectors: Vector[], x: number): Map<string, number> {
    const connections = new Map<string, number>();

    const possibleConnections = calculatePossibleConnections(vectors);

    for (let i = 0; i < x; i++) {
        const closest = popClosestConnection(possibleConnections);
        
        connections.set(closest![0], closest![1]);
    }

    return connections;
}

function makeConnectionsUntilAllConnected(vectors: Vector[]): string {
    const circuits = new Array<Set<string>>();
    const vectorsToConnect = new Set<string>(vectors.map(v => v.asKey()));

    const possibleConnections = calculatePossibleConnections(vectors);
    let lastConnection: string | null = null;

    while (vectorsToConnect.size > 0) {
        console.clear();
        console.log('Vectors left to connect:', Array.from(vectorsToConnect));
        console.log('Current circuits:', circuits.map(circuit => Array.from(circuit)).length);
        console.log('Possible connections left:', possibleConnections.size);

        if(vectorsToConnect.size === 1) {
            console.log('One pesky vector left:', Array.from(vectorsToConnect)[0]);
        }

        const closest = popClosestConnection(possibleConnections);
        
        pushConnectionToCircuits(closest![0], circuits);

        const [vecKey1, vecKey2] = closest![0].split('-');
        vectorsToConnect.delete(vecKey1);
        vectorsToConnect.delete(vecKey2);

        lastConnection = closest![0];
    }

    return lastConnection!;
}

function groupAsCircuits(connections: Map<string, number>): Set<string>[] {
    const circuits = new Array<Set<string>>();

    for (const connection of connections.keys()) {
        pushConnectionToCircuits(connection, circuits);
    }

    return circuits.sort((a, b) => b.size - a.size);
}

function pushConnectionToCircuits(connection: string, circuits: Set<string>[]) {
    const [vecKey1, vecKey2] = connection.split('-');

    const matchedCircuits = circuits.filter(circuit => circuit.has(vecKey1) || circuit.has(vecKey2)
    );

    if (matchedCircuits.length === 0) {
        const newCircuit = new Set<string>();
        newCircuit.add(vecKey1);
        newCircuit.add(vecKey2);
        circuits.push(newCircuit);
    } else if (matchedCircuits.length === 1) {
        const circuit = matchedCircuits[0];
        circuit.add(vecKey1);
        circuit.add(vecKey2);
    } else {
        //merge circuits
        const mergedCircuit = new Set<string>();
        for (const circuit of matchedCircuits) {
            for (const vec of circuit) {
                mergedCircuit.add(vec);
            }
            const index = circuits.indexOf(circuit);
            if (index > -1) {
                circuits.splice(index, 1);
            }
        }
        mergedCircuit.add(vecKey1);
        mergedCircuit.add(vecKey2);
        circuits.push(mergedCircuit);
    }
}

function multiply3LargestCircuits(circuits: Set<string>[]): number {
    const sortedCircuits = circuits.sort((a, b) => b.size - a.size);
    const largest3 = sortedCircuits.slice(0, 3).map(circuit => ({ circuit, size: circuit.size }));

    console.log('Largest 3 circuits and their sizes:', largest3.map(c => ({ vectors: Array.from(c.circuit), size: c.size })));

    return largest3.reduce((prod, curr) => prod * curr.size, 1);
}


async function day8() {
    readFile('day8/day8.input.txt').then((data) => {
        const vectors = data.split('\n').map(line => Vector.fromString(line.trim()));

        console.log('Vectors:', vectors.map(v => v.asKey()));

        const connections = makeXConnections(vectors, 1000);
        console.log('Connections:', connections);

        const circuits = groupAsCircuits(connections);
        console.log('Circuits:', circuits.map(circuit => Array.from(circuit)));

        const product = multiply3LargestCircuits(circuits);
        console.log('Product of sizes of 3 largest circuits:', product);
    });
}

async function day8p2() {
    readFile('day8/day8.input.txt').then((data) => {
        const vectors = data.split('\n').map(line => Vector.fromString(line.trim()));

        console.log('Vectors:', vectors.map(v => v.asKey()));

        const lastConnection = makeConnectionsUntilAllConnected(vectors);
        console.log('Last connection made to connect all vectors:', lastConnection);

        const [x1, x2] = lastConnection.split('-').map(s => Vector.fromString(s).x);
        console.log('X coordinates of last connected vectors:', x1, x2);

        const product = x1 * x2;
        console.log('Product of X coordinates of last connected vectors:', product);
    });
}
day8p2();