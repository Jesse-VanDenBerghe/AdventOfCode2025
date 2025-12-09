export async function testCaseAsync(name: string, fn: () => Promise<void>) {
    console.log(`---- Running test case: ${name} ----`);
    try {
        await fn();
        console.log(`✅ Case passed\n`);
    } catch (error) {
        console.error(error);
        console.error(`❌ Case failed\n`);
    }
}

export function testCase(name: string, fn: () => void) {
    console.log(`---- Running test case: ${name} ----`);
    try {
        fn();
        console.log(`✅ Case passed\n`);
    } catch (error) {
        console.error(error);
        console.error(`❌ Case failed\n`);
    }
}

export function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    } else {
        console.log(`- ${message}`);
    }
}

export function assertThrows(fn: () => void, message: string) {
    let threw = false;
    try {
        fn();
    } catch (error) {
        threw = true;
    }

    if (!threw) {
        throw new Error(`Expected function to throw an error: ${message}`);
    } else {
        console.log(`- ${message}`);
    }
}