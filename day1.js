/**
 * Parse a file with two columns into two lists
 * @param  {String} filePath path to a file
 * @return {Array}  array containing sorted left and right list(column)
 */
async function readListByLine(filePath){
    const fs = require('fs');
    const readline = require('readline');
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity, // Recognize all instances of CRLF ('\r\n') as a single line break
    });

    let leftList = [];
    let rightList = [];

    for await (const line of rl) {
        const [num1, num2] = line.split(/\s+/).map(Number);
        leftList.push(num1);
        rightList.push(num2);
    }

    leftList.sort();
    rightList.sort();

    return [leftList, rightList];
}

/**
 * Calculate the total difference between sorted two lists, e.g. take first element
 * from each list and calculate absolute difference, keep doing this for the rest of
 * the elements and keep adding the difference together with each step
 * @param  {String} filePath path to a file
 * @return {Number}  number representing the total difference between two sorted lists
 */
async function totalDifferenceBetweenLists(filePath) {
    const [leftList, rightList] = await readListByLine(filePath);
    return leftList.reduce((sum, leftNum, i ) => sum + Math.abs(leftNum - rightList[i]), 0);
}

async function totalDistanceBetweenLists(filePath){
    const [leftList, rightList] = await readListByLine(filePath);
    let totalDistance = 0;

    for (let i = 0; i < leftList.length; i++){
        let num = leftList[i];
        let count = 0;
        for( let j = 0; j < rightList.length; j++){
            if(num == rightList[j]){
                count++;
            }
        }
        totalDistance += num*count;
    }

    return totalDistance;
}

totalDifferenceBetweenLists('Inputs/day1-test-input.txt').then(result => console.assert(result == 11, result + "is not equal to 11")); //test
totalDifferenceBetweenLists('Inputs/day1-input.txt').then(result => console.log(result));

totalDistanceBetweenLists('Inputs/day1-test-input.txt').then(result => console.assert(result == 31, result + " is not equal to 31."))
totalDistanceBetweenLists('Inputs/day1-input.txt').then(result => console.log(result));