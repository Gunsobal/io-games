const Direction = require('./Direction');

module.exports = class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(direction, length) {
        switch (direction) {
        case Direction.UP:
            this.y -= length || 1;
            break;
        case Direction.DOWN:
            this.y += length || 1;
            break;
        case Direction.LEFT:
            this.x -= length || 1;
            break;
        case Direction.RIGHT:
            this.x += length || 1;
            break;
        }
    }

    equals({ x, y }) {
        return this.x === x && this.y === y;
    }

    clone() {
        return new Point(this.x, this.y);
    }
};
