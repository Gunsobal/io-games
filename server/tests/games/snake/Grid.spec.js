const Grid = require('../../../src/games/snake/Grid');

describe('Grid tests', () => {
    it('should have rows and cols', () => {
        const { rows, cols } = new Grid(2, 3);
        expect(cols).toBe(3);
        expect(rows).toBe(2);
    });

    it('should be able tell if point is too far to the left', () => {
        const grid = new Grid(2, 2);
        expect(grid.contains({ x: -1, y: 1 })).toBe(false);
    });

    it('should be able tell if point is too far to the right', () => {
        const grid = new Grid(2, 2);
        expect(grid.contains({ x: 2, y: 1 })).toBe(false);
    });

    it('should be able tell if point is too far to the top', () => {
        const grid = new Grid(2, 2);
        expect(grid.contains({ x: 1, y: -1 })).toBe(false);
    });

    it('should be able tell if point is too far to the bottom', () => {
        const grid = new Grid(2, 2);
        expect(grid.contains({ x: 1, y: 2 })).toBe(false);
    });
});