/*
 * Programming Quiz: Writing a For...of Loop (1-4)
 */

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

for (const day of days) {
    // Split the day into an array of characters
    let dayLettersArray = day.split('');

    // Change the first character to a capital letter
    dayLettersArray[0] = dayLettersArray[0].toUpperCase();

    // Join the array of letters for the day
    let dayArray = dayLettersArray.join('');

    // Print the entire day
    console.log(dayArray);
}
