import {fileToArray} from "../utils/fileToArray";

enum Mode {
    unknown = -1,
    decreasing = 0,
    increasing = 1,
}

function checkReport(entries: number[]) {
    let trueOp: Mode = entries[0] > entries[entries.length - 1] ? Mode.decreasing : Mode.increasing;
    let safe = true;
    for (let i = 1; i < entries.length; i++){
        const entry = entries[i];
        const previousEntry = entries[i-1];
        const diff = Math.abs(previousEntry - entry);
        const op = entry > previousEntry ? Mode.increasing : Mode.decreasing;
        if (diff < 1 || diff > 3) {
            safe = false;
            break;
        }
        if (op !== trueOp) {
            safe = false;
            break;
        }
    }
    return safe;
}

function part1() {
    const input = fileToArray(__dirname, 'input1.txt');
    let safeCount = 0;
    for (const report of input) {
        const entries = report.split(' ').map(n => parseInt(n, 10));
        const safe = checkReport(entries);
        if (safe) {
            safeCount++;
        }
    }
    console.log(`Safe reports: ${safeCount}`)
}
function part2() {
    const input = fileToArray(__dirname, 'input1.txt');
    let safeCount = 0;
    for (const report of input) {
        const entries = report.split(' ').map(n => parseInt(n, 10));
        const safe = checkReport(entries);
        if (safe) {
            safeCount++;
        } else {
            for (let i = 0; i < entries.length; i++){
                const newEntries = [...entries];
                newEntries.splice(i, 1);
                const safe = checkReport(newEntries);
                if (safe) {
                    safeCount++;
                    break;
                }
            }
        }
    }
    console.log(`Safe reports: ${safeCount}`)
}


// part1();
part2();
