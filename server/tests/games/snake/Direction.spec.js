const Direction = require('../../../src/games/snake/Direction');

describe('Direction tests', () => {
    it('should have static directions', () =>{
        expect(Direction.UP).toEqual('up');
        expect(Direction.DOWN).toEqual('down');
        expect(Direction.RIGHT).toEqual('right');
        expect(Direction.LEFT).toEqual('left');
    });

    it('should have a value', () => {
        const dir = new Direction(Direction.UP);
        expect(dir.value).toEqual(Direction.UP);
    });

    it('should be able to turn right', () => {
        const dir = new Direction(Direction.RIGHT);
        dir.turnRight();
        expect(dir.value).toBe(Direction.DOWN);
        dir.turnRight();
        expect(dir.value).toBe(Direction.LEFT);
        dir.turnRight();
        expect(dir.value).toBe(Direction.UP);
        dir.turnRight();
        expect(dir.value).toBe(Direction.RIGHT);
    });

    it('should be able to turn left', () => {
        const dir = new Direction(Direction.RIGHT);
        dir.turnLeft();
        expect(dir.value).toBe(Direction.UP);
        dir.turnLeft();
        expect(dir.value).toBe(Direction.LEFT);
        dir.turnLeft();
        expect(dir.value).toBe(Direction.DOWN);
        dir.turnLeft();
        expect(dir.value).toBe(Direction.RIGHT);
    });
});
