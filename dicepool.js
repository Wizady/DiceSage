// Constants
const SIMULATION_ROLLS = 1000;

// Dice pool array to keep track of added dice
let dicePool = [];

/**
 * Adds a dice to the dice pool or updates its count if it already exists.
 *
 * @param {number} sides - Number of sides on the dice.
 */
function addDiceToPool(sides) {
    let foundDice = dicePool.find(dice => dice.sides === sides);
    if (foundDice) {
        // If dice already exists in pool, increase its count
        foundDice.count += 1;
    } else {
        // Add new dice entry to pool
        dicePool.push({ sides: sides, count: 1 });
    }
    displayDicePool();
}

/**
 * Removes a dice from the dice pool or decrements its count.
 *
 * @param {number} sides - Number of sides on the dice.
 */
function removeDiceFromPool(sides) {
    let foundDice = dicePool.find(dice => dice.sides === sides);
    if (foundDice && foundDice.count > 0) {
        foundDice.count -= 1;
        if (foundDice.count === 0) {
            dicePool.splice(dicePool.indexOf(foundDice), 1);
        }
    }
    displayDicePool();
}

/**
 * Displays the current dice pool on the page.
 */
function displayDicePool() {
    const dicePoolList = document.getElementById('dicePoolList');
    dicePoolList.innerHTML = ''; // Clear existing list

    dicePool.forEach(dice => {
        const listItem = document.createElement('li');
        listItem.textContent = `D${dice.sides} x ${dice.count}`;
        dicePoolList.appendChild(listItem);
    });
}

/**
 * Calculates and displays the average sum of the dice pool.
 */
function calculateAverageSum() {
    let totalAverage = 0;

    dicePool.forEach(dice => {
        const averageValueOfDie = (dice.sides + 1) / 2;
        totalAverage += averageValueOfDie * dice.count;
    });

    document.getElementById('averageSum').textContent = `Average Sum: ${totalAverage}`;
}

/**
 * Simulates dice rolls, calculates average sum and displays histogram.
 */
function simulateRollingDice() {
    let results = [];
    let histogram = {};

    for (let i = 0; i < SIMULATION_ROLLS; i++) {
        let rollSum = 0;
        dicePool.forEach(dice => {
            for (let j = 0; j < dice.count; j++) {
                rollSum += getRandomNumber(1, dice.sides);
            }
        });
        results.push(rollSum);
        histogram[rollSum] = (histogram[rollSum] || 0) + 1;
    }

    const averageSum = results.reduce((a, b) => a + b, 0) / SIMULATION_ROLLS;
    document.getElementById('simulationResult').textContent = `Simulation Average Sum: ${averageSum.toFixed(2)}`;
    displayHistogram(histogram);
}

/**
 * Displays histogram visualization for simulation results.
 *
 * @param {object} histogram - Histogram data.
 */
function displayHistogram(histogram) {
    const container = document.getElementById('histogramContainer');
    container.innerHTML = '';

    for (let sum in histogram) {
        const bar = document.createElement('div');
        bar.classList.add('histogram-bar');
        bar.style.height = histogram[sum] + "px";
        bar.title = `Sum: ${sum}, Count: ${histogram[sum]}`;
        container.appendChild(bar);
    }
}

/**
 * Resets the dice pool and clears the display.
 */
function resetDicePool() {
    dicePool.length = 0;
    document.getElementById('dicePoolList').innerHTML = '';
    document.getElementById('averageSum').textContent = `Average Sum: N/A`;
}

/**
 * Utility function to generate a random number between min and max (inclusive).
 *
 * @param {number} min - Minimum value.
 * @param {number} max - Maximum value.
 * @returns {number} Random number.
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
