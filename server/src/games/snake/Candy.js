const Point = require('./Point');

module.exports = class Candy {
    constructor(point, color) {
        this.point = point || new Point(0, 0);
        this.color = color || 'red';
    }
};
