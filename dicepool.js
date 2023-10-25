let dicePool = [];
const SIMULATION_ROLLS = 1000;

function addDiceToPool(sides) {
    let foundDice = dicePool.find(dice => dice.sides === sides);
    if (foundDice) {
        // If the dice is already in the pool, increase its count
        foundDice.count += 1;
    } else {
        // If the dice is not in the pool, add it with a count of 1
        dicePool.push({ sides: sides, count: 1 });
    }
    displayDicePool();
}

function removeDiceFromPool(sides) {
    let foundDice = dicePool.find(dice => dice.sides === sides);
    if (foundDice && foundDice.count > 0) {
        // If the dice is in the pool and its count is greater than 0, decrease its count
        foundDice.count -= 1;
        // If the count becomes 0 after decreasing, remove the dice entry from the pool
        if (foundDice.count === 0) {
            let index = dicePool.indexOf(foundDice);
            dicePool.splice(index, 1);
        }
    }
    displayDicePool();
}

function displayDicePool() {
    const dicePoolList = document.getElementById('dicePoolList');
    dicePoolList.innerHTML = ""; // Clear the existing list
    dicePool.forEach(dice => {
        let listItem = document.createElement('li');
        listItem.textContent = `D${dice.sides} x ${dice.count}`;
        dicePoolList.appendChild(listItem);
    });
}

function calculateAverageSum() {
    let totalAverage = 0;
    dicePool.forEach(dice => {
        // Calculate the average value of the die and multiply by its count
        let averageValueOfDie = (dice.sides + 1) / 2;
        totalAverage += averageValueOfDie * dice.count;
    });

    // Display the result
    document.getElementById('averageSum').textContent = `Average Sum: ${totalAverage}`;
}

function simulateRollingDice() {
    let results = [];
    let rolls = SIMULATION_ROLLS;
    let histogram = {};

    for (let i = 0; i < rolls; i++) {
        let rollSum = 0;
        dicePool.forEach(dice => {
            for (let j = 0; j < dice.count; j++) {
                rollSum += getRandomNumber(1, dice.sides);
            }
        });
        results.push(rollSum);

        histogram[rollSum] = (histogram[rollSum] || 0) + 1;
    }

    let averageSum = results.reduce((a, b) => a + b, 0) / rolls;

    // Display the simulation result
    document.getElementById('simulationResult').textContent = `Simulation Average Sum: ${averageSum.toFixed(2)}`;

    // Display the histogram
    displayHistogram(histogram);
}

function displayHistogram(histogram) {
    let container = document.getElementById('histogramContainer');
    container.innerHTML = '';

    for (let sum in histogram) {
        let bar = document.createElement('div');
        bar.classList.add('histogram-bar');
        bar.style.height = histogram[sum] + "px";
        bar.title = `Sum: ${sum}, Count: ${histogram[sum]}`;
        container.appendChild(bar);
    }
}

// Utility function to get a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetDicePool() {
    // Clear the dice pool array
    dicePool.length = 0;

    // Reset the display
    const dicePoolList = document.getElementById('dicePoolList');
    dicePoolList.innerHTML = "";

    // Reset the average sum display
    document.getElementById('averageSum').textContent = `Average Sum: N/A`;
}
