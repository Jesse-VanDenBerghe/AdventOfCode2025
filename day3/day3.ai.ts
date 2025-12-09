//AI suggested alternative
export function maxJoltageForBankAI(bank: string): number {
    const KEEP_COUNT = 12;
    if (bank.length <= KEEP_COUNT) return parseInt(bank, 10) || 0;

    const stack: string[] = [];
    // Calculate how many digits we are allowed to 'delete' to improve our number
    let dropsAllowed = bank.length - KEEP_COUNT;

    for (const digit of bank) {
        // While the current digit is bigger than the last one we picked,
        // AND we still have "drops" allowed... remove the small one.
        while (dropsAllowed > 0 && stack.length > 0 && digit > stack[stack.length - 1]) {
            stack.pop();
            dropsAllowed--;
        }
        stack.push(digit);
    }

    // In case we have a descending sequence (e.g. 98765...) and didn't use up 
    // our drops, we just truncate the end to get length 12.
    const result = stack.slice(0, KEEP_COUNT).join('');
    
    return parseInt(result, 10);
}