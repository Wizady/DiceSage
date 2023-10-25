// Constants
const MAX_DISPLAYED_ROLLS = 10;

// Event Listeners
document.getElementById('rollWithSidesButton').addEventListener('click', function() {
    const selectedSides = parseInt(document.getElementById('diceSides').value);
    rollDice(selectedSides);
});

/**
 * Rolls the dice and updates the log.
 *
 * @param {number} sides - The number of sides on the dice.
 */
function rollDice(sides) {
    const numberOfDice = document.getElementById('diceCount').value;
    const rolls = getDiceRolls(numberOfDice, sides);
    const sum = getSum(rolls);
    const logMessage = formatLogMessage(numberOfDice, sides, sum, rolls);
    updateLog(logMessage);
}

/**
 * Generates an array of random dice rolls.
 *
 * @param {number} count - Number of dice to roll.
 * @param {number} sides - Number of sides on each dice.
 * @returns {number[]} An array of dice roll results.
 */
function getDiceRolls(count, sides) {
    let rolls = [];
    for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    return rolls;
}

/**
 * Calculates the sum of an array of numbers.
 *
 * @param {number[]} numbers - An array of numbers.
 * @returns {number} The sum of the numbers.
 */
function getSum(numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Formats the log message.
 *
 * @param {number} count - Number of dice rolled.
 * @param {number} sides - Number of sides on each dice.
 * @param {number} sum - Total of the dice rolls.
 * @param {number[]} rolls - An array of dice roll results.
 * @returns {string} Formatted log message.
 */
function formatLogMessage(count, sides, sum, rolls) {
    const formattedRolls = rolls.join('+');
    return `Rolled ${count} d${sides} for: ${sum} (${formattedRolls})`;
}

/**
 * Updates the roll log with a new message.
 *
 * @param {string} message - The log message.
 */
function updateLog(message) {
    const logEntry = document.createElement('li');
    logEntry.textContent = message;

    const logList = document.getElementById('rollLog');
    if (logList.firstChild) {
        logList.insertBefore(logEntry, logList.firstChild);
    } else {
        logList.appendChild(logEntry);
    }

    // Ensure only the last MAX_DISPLAYED_ROLLS rolls are displayed
    while (logList.children.length > MAX_DISPLAYED_ROLLS) {
        logList.removeChild(logList.lastChild);
    }
}

/**
 * Toggles the visibility of the hamburger menu.
 */
function toggleMenu() {
    const menu = document.getElementById('menuItems');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}
