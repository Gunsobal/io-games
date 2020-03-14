const Candy = require('$snake/Candy');

describe('Candy tests', () => {
    it('has a point', () => {
        expect((new Candy).point).toBeTruthy();
    });

    it('has a color', () => {
        expect((new Candy).color).toBeTruthy();
    });
});
