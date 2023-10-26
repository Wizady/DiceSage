// Constants
const MAX_DISPLAYED_ROLLS = 10;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rollWithSidesButton').addEventListener('click', function() {
        const selectedSides = parseInt(document.getElementById('diceSides').value);
        rollDice(selectedSides);
    });
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
    saveRollLogToSession();
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
 * Saves the current roll log to sessionStorage.
 */
function saveRollLogToSession() {
    const rollLogElements = document.getElementById('rollLog').children;
    const logMessages = Array.from(rollLogElements).map(el => el.textContent);
    sessionStorage.setItem('rollLog', JSON.stringify(logMessages));
}

/**
 * Loads the roll log from sessionStorage and displays it.
 */
function loadRollLogFromSession() {
    const savedRollLog = sessionStorage.getItem('rollLog');
    if (savedRollLog) {
        const logMessages = JSON.parse(savedRollLog);
        logMessages.forEach(message => updateLog(message));
    }
}

loadRollLogFromSession();

module.exports = { rollDice, getDiceRolls, getSum, formatLogMessage };