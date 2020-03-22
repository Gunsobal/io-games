const Grid = require('./Grid');
const Snake = require('./Snake');
const Point = require('./Point');
const Direction = require('./Direction');
const EventEmitter = require('events');

class State extends EventEmitter {
    constructor(grid, snakes, candies) {
        super();
        this.grid = grid || new Grid(20, 20);
        this.snakes = snakes || {};
        this.candies = candies || [];
    }

    applyEvent({ type, payload }) {
        if (typeof this[type] === 'function') {
            this[type](payload);
        }
    }

    spawnSnake({ id, point, direction, color }) {
        this.snakes[id] = new Snake(point, direction, color);
    }

    turnSnake({ id, direction }) {
        if (this.snakes[id] !== undefined) {
            if (direction === Direction.LEFT) {
                this.snakes[id].turnLeft();
            } else if (direction === Direction.RIGHT) {
                this.snakes[id].turnRight();
            }
        }
    }

    update() {
        _.each(_.values(this.snakes), snake => snake.move());
        this.checkForCandyCollision();
        this.checkForSnakeDeath();
    }

    growSnake({ id }) {
        if (this.snakes[id] !== undefined) {
            this.snakes[id].grow();
        }
    }

    checkForCandyCollision() {
        _.each(this.candies, candy => {
            _.each(_.values(this.snakes), snake => {
                if (snake.getHead().equals(candy.point)) {
                    this.emit('candy', candy);
                    return false;
                }
            });
        });
    }

    checkForSnakeDeath() {
        _.each(_.values(this.snakes), (snake, id) => {
            if (!this.grid.contains(snake.getHead()) || snake.isEatingTail()) {
                this.emit('death', { id, snake });
            }
        });
    }
};

State.SPAWN_SNAKE = 'spawnSnake';
State.TURN_SNAKE = 'turnSnake';
State.GROW_SNAKE = 'growSnake';
State.UPDATE = 'update';

module.exports = State;