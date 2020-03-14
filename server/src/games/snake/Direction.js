class Direction {
    constructor(value) {
        this.value = value;
    }

    turnRight() {
        switch (this.value) {
        case Direction.UP:
            this.value = Direction.RIGHT;
            break;
        case Direction.RIGHT:
            this.value = Direction.DOWN;
            break;
        case Direction.DOWN:
            this.value = Direction.LEFT;
            break;
        case Direction.LEFT:
            this.value = Direction.UP;
            break;
        }
    }

    turnLeft() {
        switch (this.value) {
        case Direction.UP:
            this.value = Direction.LEFT;
            break;
        case Direction.LEFT:
            this.value = Direction.DOWN;
            break;
        case Direction.DOWN:
            this.value = Direction.RIGHT;
            break;
        case Direction.RIGHT:
            this.value = Direction.UP;
            break;
        }
    }
}

Direction.UP = 'up';
Direction.DOWN = 'down';
Direction.LEFT = 'left';
Direction.RIGHT = 'right';

module.exports = Direction;
