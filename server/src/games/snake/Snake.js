const Point = require('./Point');
const Direction = require('./Direction');

module.exports = class Snake {
    constructor(point, direction, color) {
        this.points = [point || new Point(0, 0)];
        this.direction = direction || new Direction(Direction.RIGHT);
        this.color = color || 'white';
        this.phantomTail = null;
    }
    
    getPoints() {
        return this.points;
    }

    getDirection() {
        return this.direction;
    }

    getHead() {
        return this.points[0];
    }

    getBody() {
        return this.points.slice(1);
    }

    getTail() {
        return this.points[this.points.length - 1];
    }

    move() {
        this.phantomTail = this.getTail().clone();
        
        for (let i = this.points.length - 1; i > 0; --i) {
            this.points[i] = this.points[i - 1].clone();
        }

        this.getHead().move(this.direction.value);

        return this;
    }
    
    grow() {
        if (this.phantomTail !== null) {
            this.points.push(this.phantomTail);
            this.phantomTail = null;
        }

        return this;
    }

    turnRight() {
        this.direction.turnRight();

        return this;
    }

    turnLeft() {
        this.direction.turnLeft();

        return this;
    }

    isEatingTail() {
        return _.find(this.getBody(), point => point.equals(this.getHead())) !== undefined;
    }
};
