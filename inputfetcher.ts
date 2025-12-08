import fs from 'fs/promises';

const dayInputEndpointTemplate = "https://adventofcode.com/2025/day/{day}/input"
const outputFileTemplate = "./inputs/day{day}.txt"

let cachedSessionCookie: string | null = null;

async function fetchInputForDay(day: number): Promise<string> {
    const endpoint = dayInputEndpointTemplate.replace("{day}", day.toString());
    const sessionCookie = await fetchCookieFromSecrets();
    const response = await fetch(endpoint, {
        headers: {
            'Cookie': `session=${sessionCookie}`
        }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch input for day ${day}: ${response.statusText}`);
    }

    const input = await response.text();
    return input;
}

async function fetchCookieFromSecrets(): Promise<string> {
    if (cachedSessionCookie) {
        return cachedSessionCookie;
    }

    const secrets = await fs.readFile('./secrets.yaml', 'utf-8');
    const sessionCookieMatch = secrets.match(/sessionCookie:\s*"(.*)"/);
    if (!sessionCookieMatch) {
        throw new Error("Session cookie not found in secrets.yaml");
    }
    
    cachedSessionCookie = sessionCookieMatch[1];
    return cachedSessionCookie;
}

async function saveInputToFile(day: number, input: string): Promise<void> {
    const filePath = outputFileTemplate.replace("{day}", day.toString());
    
    await fs.mkdir('./inputs', { recursive: true });
    await fs.writeFile(filePath, input);
}

export async function fetchDayInputAndSave(day: number): Promise<void> {
    try {
        const input = await fetchInputForDay(day);
        await saveInputToFile(day, input);
        console.log(`Input for day ${day} saved successfully.`);
    } catch (error) {
        console.error(`Error fetching or saving input for day ${day}:`, error);
        throw error;
    }
}