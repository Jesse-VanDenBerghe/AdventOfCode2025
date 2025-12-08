import fs from 'fs/promises';

const dayInputEndpointTemplate = "https://adventofcode.com/2025/day/{day}/input"

const outputFileTemplate = "./inputs/day{day}.txt"

export async function fetchInputForDay(day: number): Promise<string> {
    const endpoint = dayInputEndpointTemplate.replace("{day}", day.toString());
    const response = await fetch(endpoint, {
        headers: {
            // Include your session cookie or other authentication here if needed
            'Cookie': 'session=53616c7465645f5fb41061ff2ce718ea827e755a249ae3b3aa12d78c22f14b0a406378b948ea21ce1055b1aa8bbea1eaff42b4a627dd316c7c5c4ec2663bab4a'
        }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch input for day ${day}: ${response.statusText}`);
    }

    const input = await response.text();
    return input;
}

export async function saveInputToFile(day: number, input: string): Promise<void> {
    const filePath = outputFileTemplate.replace("{day}", day.toString());
    
    await fs.mkdir('./inputs', { recursive: true });

    await fs.writeFile(filePath, input);
}

function fetchDay1InputAndSave(): void {
    fetchInputForDay(1)
        .then(input => saveInputToFile(1, input))
        .then(() => console.log("Input for day 1 saved successfully."))
        .catch(error => console.error("Error fetching or saving input for day 1:", error));
}

fetchDay1InputAndSave();