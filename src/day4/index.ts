import {fileToArray} from "../utils/fileToArray";
import pc from "picocolors"

type Position = [number, number];

function part1() {
    const input = fileToArray(__dirname, 'input1.txt').map(row => row.split(''));
    const display = input.map(function(arr) {
        return arr.slice().map(r => '.');
    });
    const xPositions: Position[] = []
    let count = 0;
    for (let y = 0; y < input.length; y++){
        const row = input[y];
        for (let x = 0; x < row.length; x++){
            const col = row[x];
            if (col === "X") {
                xPositions.push([x, y])
            }
        }
        const jointRow = row.join('');
        count += [...jointRow.matchAll(/^XMAS$|^SAMX$/g)].length;
    }

    const directions = ["up", "down", "left", "right", "up-left", "down-right", "down-left", "up-right"]
    const searchCoords = ([x,y]: Position): Position[][] => [
        // Up
        [
            [x, y - 3], // S
            [x, y - 2], // A
            [x, y - 1], // M
            [x, y],     // X
        ],
        // Down
        [
            [x, y],
            [x, y + 1],
            [x, y + 2],
            [x, y + 3],
        ],
        // Left
        [
            [x - 3, y],
            [x - 2, y],
            [x - 1, y],
            [x, y],
        ],
        // Right
        [
            [x, y],
            [x + 1, y],
            [x + 2, y],
            [x + 3, y],
        ],
        // Diag up-left
        [
            [x-3, y-3],
            [x-2, y-2],
            [x-1, y-1],
            [x, y],
        ],
        // Diag down-right
        [
            [x, y],
            [x+1, y+1],
            [x+2, y+2],
            [x+3, y+3],
        ],
        // Diag down-left
        [
            [x-3, y+3],
            [x-2, y+2],
            [x-1, y+1],
            [x, y]
        ],
        // Diag up-right
        [
            [x, y],
            [x+1, y-1],
            [x+2, y-2],
            [x+3, y-3],
        ]
    ]
    const mapPositions = (pos: Position) => {
        if (input[pos[1]] && input[pos[1]][pos[0]]) {
            return input[pos[1]][pos[0]]
        }
    }

    for (const pos of xPositions) {
        const searchPositions = searchCoords(pos);
        let i = 0;
        for (const searchDirection of searchPositions) {
            const searchStr = searchDirection.map(mapPositions).filter(Boolean).join('');
            i = (i + 1) % directions.length;
            if (/^XMAS$|^SAMX$/g.test(searchStr)) {
                for (const pos of searchDirection) {
                    display[pos[1]][pos[0]] = pc.green(input[pos[1]][pos[0]])
                }
                count++;
            }
        }

    }
    console.log(display.map(row => row.join('')).join('\n'));
    console.log(count);
}

function part2() {
    const input = fileToArray(__dirname, 'testinput1.txt').map(row => row.split(''));
    // Clone grid for displaying output
    const display = input.map(function(arr) {
        return arr.slice().map(r => '.');
    });

    const aPositions: Position[] = []
    let count = 0;
    for (let y = 0; y < input.length; y++){
        const row = input[y];
        for (let x = 0; x < row.length; x++){
            const col = row[x];
            if (col === "A") {
                aPositions.push([x, y])
            }
        }
    }
    const searchCoords = ([x, y]: Position): Position[][] => [
        [
            [x-1, y-1],         [x+1, y-1],
                        [x, y],
            [x-1, y+1],         [x+1, y+1]
        ]
    ]
    const mapPositions = (pos: Position) => {
        if (input[pos[1]] && input[pos[1]][pos[0]]) {
            return input[pos[1]][pos[0]]
        }
    }
    let colorI = 0;
    let colors = [pc.green, pc.yellow];
    for (const pos of aPositions) {
        const searchPositions = searchCoords(pos);
        for (const searchDirection of searchPositions) {
            const chars = searchDirection.map(mapPositions)
            if ([...chars].sort().join('') !== "AMMSS") continue;
            const topLeft = chars[0]!;
            const topRight = chars[1]!;
            const bottomLeft =chars[3]!;
            const bottomRight = chars[4]!;

            const areOpposite = (c1: string, c2: string) => c1 !== c2;

            if (areOpposite(topLeft, bottomRight) && areOpposite(topRight, bottomLeft)) {
                for (const pos of searchDirection) {
                    display[pos[1]][pos[0]] = colors[colorI](input[pos[1]][pos[0]])
                }
                colorI = (colorI + 1) % colors.length;
                count++;
            }
        }
    }
    console.log(display.map(row => row.join('')).join('\n'));
    console.log(count);
}

// part1();
part2();
