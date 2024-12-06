type Y = number;
type X = number;
type Position = [Y, X];

enum Direction {
    up,
    right,
    down,
    left
}
function directionStr(facing: Direction) {
    if (facing === 0) return "up";
    if (facing === 1) return "right";
    if (facing === 2) return "down";
    if (facing === 3) return "left";
}

function getNextPos(position: Position, facing: Direction): Position {
    let nextPos: Position = [position[0], position[1]];
    if (facing === Direction.up) {
        nextPos[0] -= 1
    } else if (facing === Direction.right) {
        nextPos[1] += 1
    } else if (facing === Direction.down) {
        nextPos[0] += 1
    } else if (facing === Direction.left) {
        nextPos[1] -= 1
    }
    return nextPos
}

function obstacleAhead(position: Position, grid: string[][], facing: Direction) {
    const checkPos = getNextPos(position, facing);
    const checkCell = grid[checkPos[0]][checkPos[1]];
    console.log({checkPos, checkCell});
    if (!checkCell) {
        return null;
    }
    return checkCell === "#";

}

export function part1(rows: string[]) {

    const grid: string[][] = rows.map(row => row.split(''));
    const width = grid[0].length - 1;
    const height = grid.length - 1;

    let startingPos: Position | null = null;
    startingPosLoop: for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "^") {
                startingPos = [y, x]
                break startingPosLoop;
            }
        }
    }
    if (!startingPos) throw new Error("No starting pos found");

    console.log({startingPos})

    let facing = Direction.up;
    let position = startingPos;
    let inBounds = true;
    let cellCount = 1;
    while (inBounds) {
        const hasObstacle = obstacleAhead(position, grid, facing);
        console.log(`Looking ${directionStr(facing)}; position: ${position}; Count: ${cellCount}; Obstacle infront: ${hasObstacle}`)
        if (hasObstacle) {
            facing = (facing + 1) % 4; // Turn 90deg right
        }
        cellCount++;
        grid[position[0]][position[1]] = '.'
        position = getNextPos(position, facing);
        console.log({width, height, nextPos: position});
        if (position[0] > height || position[1] > width){
            inBounds = false;
            break;
        }
        grid[position[0]][position[1]] = '^'
        /*console.clear();
        console.log(grid.map(r => r.join('')).join('\n'))*/
    }
    return cellCount;

}
export function part2(rows: string[]) {

}
