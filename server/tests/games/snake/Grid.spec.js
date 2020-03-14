const Grid = require('../../../src/games/snake/Grid');

describe('Grid tests', () => {
    it('should have rows and cols', () => {
        const { rows, cols } = new Grid(2, 3);
        expect(cols).toBe(3);
        expect(rows).toBe(2);
    });
});