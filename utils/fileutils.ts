import fs from 'fs/promises';

export async function readFile(filePath: string): Promise<string> {
    return fs.readFile(filePath, 'utf-8');
}