/*
 * Programming Quiz: Using the Rest Parameter (1-5)
 */

// your code goes here

function average(...numbers) {
    let total = 0;

    if (numbers.length === 0) {
        return 0;
    } else {
        for (const number of numbers) {
            total += number;
        }
        let avg = total / numbers.length;
        return avg;
    }

}

console.log(average(2, 6));
console.log(average(2, 3, 3, 5, 7, 10));
console.log(average(7, 1432, 12, 13, 100));
console.log(average());
