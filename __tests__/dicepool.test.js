const {
    addDiceToPool,
    removeDiceFromPool,
    calculateAverageSum,
    simulateRollingDice,
    resetDicePool,
    getRandomNumber
} = require('../dicepool.js'); // replace 'path_to_your_js_file' with the actual path to your JS file


describe('Dice Pool Functions', () => {

    beforeEach(() => {
        // Reset DOM elements and global variables before each test
        document.body.innerHTML = `
            <ul id="dicePoolList"></ul>
            <div id="averageSum"></div>
            <div id="simulationResult"></div>
            <div id="histogramContainer"></div>
        `;
        resetDicePool();
    });

    test('addDiceToPool should add a new dice or increment count', () => {
        addDiceToPool(6);
        expect(document.getElementById('dicePoolList').textContent).toBe('D6 x 1');
        addDiceToPool(6);
        expect(document.getElementById('dicePoolList').textContent).toBe('D6 x 2');
    });

    test('removeDiceFromPool should decrement dice count or remove dice', () => {
        addDiceToPool(6);
        addDiceToPool(6);
        removeDiceFromPool(6);
        expect(document.getElementById('dicePoolList').textContent).toBe('D6 x 1');
        removeDiceFromPool(6);
        expect(document.getElementById('dicePoolList').textContent).toBe('');
    });

    test('calculateAverageSum should compute the correct average sum', () => {
        addDiceToPool(6);
        calculateAverageSum();
        expect(document.getElementById('averageSum').textContent).toBe('Average Sum: 3.5');
    });

    test('simulateRollingDice should simulate dice rolls and update displays', () => {
        // Given: Mocking getRandomNumber to always return 4
        jest.spyOn(Math, `random`);
        Math.random.mockImplementation(() => {return 0.5});

        // When: Adding two D6 dice to the pool and simulating the rolls
        addDiceToPool(6);
        addDiceToPool(6);
        simulateRollingDice();

        // Then: Expecting the simulation result to always be 8 (since we always roll 4 for each dice)
        expect(document.getElementById('simulationResult').textContent).toBe('Simulation Average Sum: 8.00');
    });

    test('resetDicePool should clear the dice pool and reset displays', () => {
        addDiceToPool(6);
        resetDicePool();
        expect(document.getElementById('dicePoolList').textContent).toBe('');
        expect(document.getElementById('averageSum').textContent).toBe('Average Sum: N/A');
    });

    test('getRandomNumber should produce a number between min and max inclusive', () => {
        const randomNum = getRandomNumber(1, 6);
        expect(randomNum).toBeGreaterThanOrEqual(1);
        expect(randomNum).toBeLessThanOrEqual(6);
    });

});
