const Point = require('$snake/Point');

module.exports = class Candy {
    constructor(point) {
        this.point = point || new Point(0, 0);
        this.color = 'red';
    }
};
