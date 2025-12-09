//AI suggested alternative using periodicity check
export function isValidIdAIPeriodic(id: number): boolean {
    const str = id.toString();
    
    // Safety check for empty strings
    if (str.length === 0) return true;

    // Logic: If 'str' is found in 'str + str' (starting after index 0),
    // and strictly before the second 'str' begins, it has a repeating pattern.
    const isPeriodic = (str + str).indexOf(str, 1) !== str.length;

    return !isPeriodic;
}

// AI suggested alternative using regex
export function isValidAIRegex(id: number): boolean {
    const str = id.toString();
    
    // Regex explanation:
    // ^      : Start of string
    // (.+)   : Capture group 1 (the pattern), matches 1 or more chars
    // \1+    : Matches the content of group 1, repeated 1 or more times
    // $      : End of string
    const hasRepeatingPattern = /^(.+)\1+$/.test(str);

    return !hasRepeatingPattern;
}