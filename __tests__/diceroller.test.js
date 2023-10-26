// Importing the required functions from diceroller script
const { rollDice, getDiceRolls, getSum, formatLogMessage } = require('../diceroller.js');

describe('Diceroller Functions', () => {

    // Set up a basic DOM structure before each test
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="diceSides" value="6">
            <input id="diceCount" value="1">
            <button id="rollWithSidesButton"></button>
            <ul id="rollLog">
                <li>Example log</li>
            </ul>
        `;
    });

    test('getDiceRolls should return an array of dice rolls', () => {
        const mockMath = Object.create(global.Math);
        mockMath.random = jest.fn(() => 0.5);  // Always get the middle value.
        global.Math = mockMath;

        const result = getDiceRolls(2, 6);
        expect(result).toEqual([4, 4]); // As 0.5 of 6 sides + 1 = 4
    });

    test('getSum should return the sum of numbers in an array', () => {
        const numbers = [2, 4, 6, 8];
        expect(getSum(numbers)).toBe(20);
    });

    test('formatLogMessage should format the log message correctly', () => {
        const count = 2;
        const sides = 6;
        const sum = 8;
        const rolls = [3, 5];
        expect(formatLogMessage(count, sides, sum, rolls)).toBe('Rolled 2 d6 for: 8 (3+5)');
    });

    test('rollDice should roll dice and update log', () => {
        rollDice(6);
        const logList = document.getElementById('rollLog');
        expect(logList.children.length).toBe(2); // Because one new entry is added to the log
    });

});
