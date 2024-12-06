import {fileToArray} from "../utils/fileToArray";
import {part1, part2} from "./index";
import {timeTaken} from "../utils/timeTaken";

describe("day6", () => {
    describe("Part1", () => {
        const testData = fileToArray(__dirname, 'testinput.txt');
        const actualData = fileToArray(__dirname, 'input.txt');

        it("Should return the given answer", () => {
            expect(timeTaken('Part 1: Test Data', part1, testData)).toEqual(41)
        })

        it.skip("Should return the correct answer for actual input", () => {
            expect(timeTaken('Part 1: Actual Data', part1, actualData)).toEqual(0);
        })

    })
    describe.skip("Part2", () => {
        const testData = fileToArray(__dirname, 'testinput.txt');
        const actualData = fileToArray(__dirname, 'input.txt');

        it("Should return the given answer", () => {
            expect(timeTaken('Part 2: Test Data', part2, testData)).toEqual(0)
        })

        it("Should return the correct answer for actual input", () => {
            expect(timeTaken('Part 2: Actual Data', part2, actualData)).toEqual(0);
        })

    })
})
