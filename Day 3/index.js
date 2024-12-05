const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');

function findClosestSmaller(arr, target) {
    const smallerNumbers = arr.filter(num => num < target);
    return smallerNumbers.length === 0 ? null : smallerNumbers[smallerNumbers.length - 1];
}

try {
    const data = fs.readFileSync(filePath, 'utf8');

    const multiplicationRegex = /mul\((\d{1,3}),(\d{1,3})\)/gi;
    const multiplicationMatches = [...data.matchAll(multiplicationRegex)];


    const doRegex = /do\(\)/gi;
    const doMatches = [...data.matchAll(doRegex)].map(d => d.index);

    const dontRegex = /don't\(\)/gi;
    const dontMatches = [...data.matchAll(dontRegex)].map(d => d.index);;


    const sum = multiplicationMatches.reduce((sum, mult) => {

        const isAllowed = findClosestSmaller(dontMatches, mult.index) === null ||
            findClosestSmaller(dontMatches, mult.index) < findClosestSmaller(doMatches, mult.index);


        if (isAllowed) {
            const numbers = mult[0].match(/\d{1,3}/g);
            return  sum + Number(numbers[0]) * Number(numbers[1]);
        }

        return sum

    }, 0)


    console.log("Multiplication sum: ", sum)

} catch (err) {
    console.error('Error reading file:', err);
}