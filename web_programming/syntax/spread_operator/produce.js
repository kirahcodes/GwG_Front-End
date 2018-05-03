/*
 * Instructions: Use the spread operator to combine the `fruits` and `vegetables` arrays into the `produce` array.
 */

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

// combines the fruits and vegetables array into produce array
let produce = [...fruits, ...vegetables];

console.log(produce);
