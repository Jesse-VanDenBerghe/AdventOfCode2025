import { fetchDayInputAndSave } from './inputfetcher.js';

const day = parseInt(process.argv[2], 10);

if (isNaN(day) || day < 1 || day > 25) {
    console.error('Usage: npm run fetch <day>');
    console.error('Day must be a number between 1 and 25');
    process.exit(1);
}

await fetchDayInputAndSave(day);
