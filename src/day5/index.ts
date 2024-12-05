type Rule = `${number}|${number}`;

const breakRule = (rule: Rule): [number, number] => rule.split('|').map(i => parseInt(i)) as [number, number]

// Filter out rules that don't have both numbers in the given update.
const getRulesForUpdate = (rules: Rule[], update: number[]): [number, number][] => {
    return rules.map(breakRule).filter(rule => rule.every(i => update.includes(i)))
}

// Create a list of all unique values in given ruleset in order.
const organiseRulesForUpdate = (rules: Rule[], update: number[]) => {
    const uniqueValues = rules
        .filter(ruleStr => breakRule(ruleStr).every(i => update.includes(i)))
        .flatMap(breakRule)
        .filter((i, idx, arr) => arr.findIndex(e => e === i) === idx);
    const outputArr: number[] = Array(uniqueValues.length);
    const updateRules = getRulesForUpdate(rules, update);
    for (const val of uniqueValues) {
        const leftCount = updateRules.filter(rulePair => rulePair[0] === val).length;
        outputArr[uniqueValues.length - leftCount - 1] = val;
    }
    return outputArr
}

export function part1(data: string[]): number {
    const firstUpdateIndex = data.findIndex(d => d.includes(','));
    const rules = data.slice(0, firstUpdateIndex) as Rule[];
    const updates: number[][] = data.slice(firstUpdateIndex).map(row => row.split(',').map(r => parseInt(r)));

    let sum = 0;
    for (let i = 0; i < updates.length; i++){
        const update = updates[i];
        const organised = organiseRulesForUpdate(rules, update)
        if (update.join(',') === organised.join(',')) {
            const middle = organised[Math.floor(organised.length / 2)];
            sum += middle;
        }
    }


    return sum;
}
export function part2(data: string[]): number {
    const firstUpdateIndex = data.findIndex(d => d.includes(','));
    const rules = data.slice(0, firstUpdateIndex) as Rule[];
    const updates: number[][] = data.slice(firstUpdateIndex).map(row => row.split(',').map(r => parseInt(r)));

    let sum = 0;
    for (let i = 0; i < updates.length; i++){
        const update = updates[i];
        const organised = organiseRulesForUpdate(rules, update)
        if (update.join(',') !== organised.join(',')) {
            const middle = organised[Math.floor(organised.length / 2)];
            sum += middle;
        }
    }

    return sum;
}
