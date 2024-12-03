import * as fs from "node:fs";
import path from "node:path";
import {timeTaken} from "../utils/timeTaken";

const contents = fs.readFileSync(path.join(__dirname, './input1.txt'), 'utf8');
function part1() {
    const instructions = contents.matchAll(/mul\((\d+),(\d+)\)/g);
    const sum = [...instructions].reduce((sum, [matchStr, left, right]) => {
        return sum + (parseInt(left, 10) * parseInt(right, 10));
    }, 0);
    console.log(`Sum: ${sum}`)
}
function part2() {
    const instructions = contents.matchAll(/(mul\((\d+),(\d+)\))|do\(\)|don't\(\)/g);
    let currentOp = 1;
    const sum = [...instructions].reduce((sum, [matchStr, _, left, right]) => {
        if (matchStr === 'do()') {
            currentOp = 1;
            return sum;
        } else if (matchStr === `don't()`) {
            currentOp = 0;
            return sum;
        } else {
            if (currentOp === 1) {
                return sum + (parseInt(left, 10) * parseInt(right, 10));
            }
        }
        return sum;
    }, 0);
    console.log(`Sum2: ${sum}`)
}


timeTaken(part1);
timeTaken(part2);

