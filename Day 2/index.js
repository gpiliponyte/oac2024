const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');

const redactList = (elements, index) => {
    const redactedElements = [...elements]
    redactedElements.splice(index, 1)
    return redactedElements
}
const isListCorrect = (elements, errorsAllowed = 0) => {

    for (let i = 1; i < elements.length - 1; i++) {
        let el1 = Number(elements[i - 1]);
        let el2 = Number(elements[i]);
        let el3 = Number(elements[i + 1]);

        if ((el2 < el1 && el2 < el3) ||
            (el2 > el1 && el2 > el3 ) ||
            Math.abs(el1 - el2) < 1 ||
            Math.abs(el1 - el2) > 3 ||
            Math.abs(el2 - el3) < 1 ||
            Math.abs(el2 - el3) > 3
        ) {
            if (errorsAllowed > 0) {

                const elements1 = redactList(elements, i -1)
                const elements2 = redactList(elements, i)
                const elements3 = redactList(elements, i + 1)

                return isListCorrect(elements1) || isListCorrect(elements2) || isListCorrect(elements3)
            } else {
                return 0;
            }
        }

    }

    return 1;
}

try {
    const data = fs.readFileSync(filePath, 'utf8');

    const lists = data.split("\n")

    const correct_list_sum = lists.reduce((sum, list) => {
        const elements = list.split(" ");
        const isCorrect = isListCorrect(elements, 1)
        if (isCorrect === 0) {
            console.log(list, !!isCorrect)
        }
        return sum + isCorrect}, 0)

    console.log("Correct list sum: ", correct_list_sum)

} catch (err) {
    console.error('Error reading file:', err);
}