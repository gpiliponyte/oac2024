const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');

try {
    const data = fs.readFileSync(filePath, 'utf8');

    const list1 = []
    const list2 = []

    const numbers = data.match(/\d+/g);

    numbers.forEach((num, index) => {
        if (index % 2 === 0) {
            list1.push(num);
        } else {
            list2.push(num);
        }
    });

    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    const sum = list1.reduce((sum, num1, index) => {
        return sum + Math.abs(num1 - list2[index])
    }, 0)

    console.log(sum)

} catch (err) {
    console.error('Error reading file:', err);
}