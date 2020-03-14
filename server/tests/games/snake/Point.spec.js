const Point = require('$snake/Point');

describe('Point tests', () => {
    it('should be able to compare to point', () => {
        const p = new Point(0, 0);
        expect(p.equals(new Point(0, 0))).toBe(true);
    });

    it('should be able to clone', () => {
        const p = new Point(0, 0);
        expect(p.equals(p.clone())).toBe(true);
        expect(p === p.clone()).toBe(false);
    });

    it('should be able to move by direction', () => {
        const p = new Point(0, 0);
        p.move('up', 2);
        expect(p.y).toEqual(-2);
        p.move('down');
        expect(p.y).toEqual(-1);
        p.move('right', 3);
        expect(p.x).toEqual(3);
        p.move('left', -1);
        expect(p.x).toEqual(4);
    });
});
