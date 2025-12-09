import { decryptPassword, Dial, Rotation, parseRotationsFromInputFile, decryptPasswordUsingMethod0x434C49434B } from "./day1";
import { testCase, testCaseAsync, assert } from "../utils/testutils";

async function runTests() {

     await testCaseAsync("Decrypt using example input", async () => {
        const rotations = await parseRotationsFromInputFile('./day1/day1-test.input.txt');
        const password = decryptPassword(new Dial(50), rotations);

        assert(password === 3, `Expected password to be 3, got ${password}`);
    });

    await testCaseAsync("Parse rotations from input file", async () => {
        const rotations = await parseRotationsFromInputFile('./day1/day1-test.input.txt');
        const password = decryptPasswordUsingMethod0x434C49434B(new Dial(50), rotations);

        assert(password === 6, `Expected password to be 6, got ${password}`);
    });

    await testCaseAsync("TestMethod0x434C49434B step by step", async () => {

        const dial = new Dial(50);

        const L68 = dial.rotate(Rotation.fromCode("L68"));
        console.log("L68:", L68);
        assert(L68.newNumber === 82, `Expected new number to be 82, got ${L68.newNumber}`);
        assert(L68.passedZero === 1, `Expected passed zero to be 1, got ${L68.passedZero}`);
        
        const L30 = dial.rotate(Rotation.fromCode("L30"));
        console.log("L30:", L30);
        assert(L30.newNumber === 52, `Expected new number to be 52, got ${L30.newNumber}`);
        assert(L30.passedZero === 0, `Expected passed zero to be 0, got ${L30.passedZero}`);
        
        const R48 = dial.rotate(Rotation.fromCode("R48"));
        console.log("R48:", R48);
        assert(R48.newNumber === 0, `Expected new number to be 0, got ${R48.newNumber}`);
        assert(R48.passedZero === 0, `Expected passed zero to be 0, got ${R48.passedZero}`);
        
        const L5 = dial.rotate(Rotation.fromCode("L5"));
        console.log("L5:", L5);
        assert(L5.newNumber === 95, `Expected new number to be 95, got ${L5.newNumber}`);
        assert(L5.passedZero === 0, `Expected passed zero to be 0, got ${L5.passedZero}`);
        
        const R60 = dial.rotate(Rotation.fromCode("R60"));
        console.log("R60:", R60);
        assert(R60.newNumber === 55, `Expected new number to be 55, got ${R60.newNumber}`);
        assert(R60.passedZero === 1, `Expected passed zero to be 1, got ${R60.passedZero}`);
        
        const L55 = dial.rotate(Rotation.fromCode("L55"));
        console.log("L55:", L55);
        assert(L55.newNumber === 0, `Expected new number to be 0, got ${L55.newNumber}`);
        assert(L55.passedZero === 0, `Expected passed zero to be 0, got ${L55.passedZero}`);
        
        const L1 = dial.rotate(Rotation.fromCode("L1"));
        console.log("L1:", L1);
        assert(L1.newNumber === 99, `Expected new number to be 99, got ${L1.newNumber}`);
        assert(L1.passedZero === 0, `Expected passed zero to be 0, got ${L1.passedZero}`);
        
        const L99 = dial.rotate(Rotation.fromCode("L99"));
        console.log("L99:", L99);
        assert(L99.newNumber === 0, `Expected new number to be 0, got ${L99.newNumber}`);
        assert(L99.passedZero === 0, `Expected passed zero to be 0, got ${L99.passedZero}`);
        
        const R14 = dial.rotate(Rotation.fromCode("R14"));
        console.log("R14:", R14);
        assert(R14.newNumber === 14, `Expected new number to be 14, got ${R14.newNumber}`);
        assert(R14.passedZero === 0, `Expected passed zero to be 0, got ${R14.passedZero}`);
        
        const L82 = dial.rotate(Rotation.fromCode("L82"));
        console.log("L82:", L82);
        assert(L82.newNumber === 32, `Expected new number to be 32, got ${L82.newNumber}`);
        assert(L82.passedZero === 1, `Expected passed zero to be 1, got ${L82.passedZero}`);
    });

    testCase("Decrypt password with simple rotations", () => {
        const rotations: Rotation[] = [
            Rotation.fromCode("R10"),
            Rotation.fromCode("L20"),
            Rotation.fromCode("R30"),
            Rotation.fromCode("L40"),
            Rotation.fromCode("R50"),
        ];

        const password = decryptPassword(new Dial(50), rotations);

        assert(password === 0, `Expected password to be 0, got ${password}`); 
    });

    testCase("R1 rotates from 50 to 51 without passing zero", () => {
        const dail = new Dial(50);
        
        const rotation = Rotation.fromCode("R1");
        const result = dail.rotate(rotation);
        
        assert(result.newNumber === 51, `Expected new number to be 51, got ${result.newNumber}`);
        assert(result.passedZero === 0, `Expected passed zero to be 0, got ${result.passedZero}`);
    });

    testCase("L1 rotates from 50 to 49 without passing zero", () => {
        const dail = new Dial(50);
        
        const rotation = Rotation.fromCode("L1");
        const result = dail.rotate(rotation);
        
        assert(result.newNumber === 49, `Expected new number to be 49, got ${result.newNumber}`);
        assert(result.passedZero === 0, `Expected passed zero to be 0, got ${result.passedZero}`);
    });

    testCase("R100 rotation passes zero 1 time and ends at 50", () => {
        const dail = new Dial(50);

        const rotation = Rotation.fromCode("R100");

        const result = dail.rotate(rotation);

        assert(result.newNumber === 50, `Expected new number to be 50, got ${result.newNumber}`);
        assert(result.passedZero === 1, `Expected passed zero to be 1, got ${result.passedZero}`);
    });

    testCase("L100 rotation passes zero 1 times and ends at 50", () => {
        const dail = new Dial(50);

        const rotation = Rotation.fromCode("L100");

        const result = dail.rotate(rotation);

        assert(result.newNumber === 50, `Expected new number to be 50, got ${result.newNumber}`);
        assert(result.passedZero === 1, `Expected passed zero to be 1, got ${result.passedZero}`);
    });

    testCase("L50 rotation passes zero 0 times and ends at 0", () => {
        const dail = new Dial(50);

        const rotation = Rotation.fromCode("L50");

        const result = dail.rotate(rotation);

        assert(result.newNumber === 0, `Expected new number to be 0, got ${result.newNumber}`);
        assert(result.passedZero === 0, `Expected passed zero to be 0, got ${result.passedZero}`);
    });
}
runTests();