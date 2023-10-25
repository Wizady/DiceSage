const MAX_DISPLAYED_ROLLS = 10;

document.getElementById('rollWithSidesButton').addEventListener('click', function() {
    const selectedSides = parseInt(document.getElementById('diceSides').value);
    rollDice(selectedSides);
});

function rollDice(sides) {
    const numberOfDice = document.getElementById('diceCount').value;
    const rolls = getDiceRolls(numberOfDice, sides);
    const sum = getSum(rolls);

    const logMessage = formatLogMessage(numberOfDice, sides, sum, rolls);
    updateLog(logMessage);
}

function getDiceRolls(count, sides) {
    let rolls = [];
    for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    return rolls;
}

function getSum(numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

function formatLogMessage(count, sides, sum, rolls) {
    const formattedRolls = rolls.join('+');
    return `Rolled ${count} d${sides} for: ${sum} (${formattedRolls})`;
}

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

function toggleMenu() {
    const menu = document.getElementById('menuItems');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}
