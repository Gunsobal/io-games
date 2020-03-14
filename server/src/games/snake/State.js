const Grid = require('./Grid');
const Snake = require('./Snake');
const Point = require('./Point');
const Direction = require('./Direction');
const _ = require('lodash');
const EventEmitter = require('events');

module.exports = class State extends EventEmitter {
    constructor(grid, snakes, candies) {
        super();
        this.grid = grid || new Grid(20, 20);
        this.snakes = snakes || {};
        this.candies = candies || [];
        this.idGenerator = function* () {
            for (let i = 0; ; ++i) {
                yield i;
            }
        };
    }

    spawnSnake() {
        const spawnX = Math.floor(this.grid.cols / 2);
        const spawnY = Math.floor(this.grid.rows / 2);
        const spawnDir = new Direction(Direction.RIGHT);
        const spawnColor = '#ff2233';
        const id = this.idGenerator().next().value;
        this.snakes[id] = new Snake(new Point(spawnX, spawnY), spawnDir, spawnColor);
        return id;
    }

    turnSnakeRight(id) {
        if (this.snakes[id] !== undefined) {
            this.snakes[id].turnRight();
        }
    }

    turnSnakeLeft(id) {
        if (this.snakes[id] !== undefined) {
            this.snakes[id].turnLeft();
        }
    }

    update() {
        _.each(_.values(this.snakes), snake => snake.move());
        this.checkForCandyCollision();
        this.checkForSnakeDeath();
    }

    checkForCandyCollision() {
        _.each(this.candies, candy => {
            _.each(_.values(this.snakes), snake => {
                if (snake.getHead().equals(candy.point)) {
                    snake.grow();
                    candy.point = new Point(5, 5);
                    this.emit('candy', candy);
                    return false;
                }
            });
        });
    }

    checkForSnakeDeath() {
        _.each(_.values(this.snakes), (snake, id) => {
            const head = snake.getHead();
            if (head.x < 0 || head.x === this.grid.cols
             || head.y < 0 || head.y === this.grid.rows
             || _.find(snake.getBody(), point => point.equals(head)) !== undefined) {
                snake.points = [ new Point(5, 5) ];
                this.emit('death', { id, snake });
            }
        });
    }
};
