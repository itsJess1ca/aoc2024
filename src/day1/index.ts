import { fileToArray } from "../utils/fileToArray";

function formLists(input: string[]) {
  const allNums = input.reduce<[number[], number[]]>((columns, row) => {
    const values = row.split('   ') as [string, string];
    columns[0].push(Number(values[0]));
    columns[1].push(Number(values[1]));
    return columns;
  }, [[], []])
  const left = allNums[0].sort((a, b) => a-b);
  const right = allNums[1].sort((a,b) => a-b);
  return {left, right};
}

export function part1() {
  const input = fileToArray(__dirname, 'input1.txt');
  const {left, right} = formLists(input);
  let totalDiff = 0;
  for (let i = 0; i < left.length; i++) {
    totalDiff += Math.abs(left[i] - right[i]);
  }
  console.log(`Total Diff: ${totalDiff}`);
}
export function part2() {
  const input = fileToArray(__dirname, 'input1.txt');
  const {left, right} = formLists(input);
  let similarityScore = 0;
  for (let i = 0; i < left.length; i++) {
    const leftVal = left[i];
    const rightVals = right.filter(i => i === leftVal).length;
    similarityScore += leftVal * rightVals;
  }
  console.log(`Similarity Score: ${similarityScore}`)
}


part1();
part2();