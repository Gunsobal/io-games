const Snake = require('../../../src/games/snake/Snake');
const Point = require('../../../src/games/snake/Point');
const Direction = require('../../../src/games/snake/Direction');

describe('Snake tests', () => {
    it('should be truthy', () => {
        expect(Snake).toBeTruthy();
    });

    it('should start with 1 point', () => {
        const snake = new Snake;
        expect(snake.getPoints()).toHaveLength(1);
    });

    it('should have a direction', () => {
        const snake = new Snake;
        expect(snake.getDirection().constructor.name).toEqual('Direction');
    });

    it('should be able to move', () => {
        const snake = new Snake;
        const { x, y } = snake.getPoints()[0];
        const oldPoint = new Point(x, y);
        snake.move();
        expect(snake.getPoints()[0].equals(oldPoint)).toBe(false);
    });

    it('should move correctly when direction is up', () => {
        const snake = new Snake(new Point(5, 5), new Direction(Direction.UP));
        snake.move();
        expect(snake.getPoints()[0].equals(new Point(5, 4))).toBe(true);
    });

    it('should move correctly when direction is down', () => {
        const snake = new Snake(new Point(5, 5), new Direction(Direction.DOWN));
        snake.move();
        expect(snake.getPoints()[0].equals(new Point(5, 6))).toBe(true);
    });

    it('should move correctly when direction is left', () => {
        const snake = new Snake(new Point(5, 5), new Direction(Direction.LEFT));
        snake.move();
        expect(snake.getPoints()[0].equals(new Point(4, 5))).toBe(true);
    });

    it('should move correctly when direction is right', () => {
        const snake = new Snake(new Point(5, 5), new Direction(Direction.RIGHT));
        snake.move();
        expect(snake.getPoints()[0].equals(new Point(6, 5))).toBe(true);
    });

    it('should be able to grow', () => {
        const snake = new Snake;
        snake.move().grow();
        expect(snake.getPoints()).toHaveLength(2);
    });

    it('should add newest point to the back of its tail', () => {
        const snake = new Snake(new Point(5, 5), new Direction(Direction.RIGHT));
        snake.move().grow();
        expect(snake.getPoints()[1].equals(new Point(5, 5))).toBe(true);
    });

    it('should be able to turn right', () => {
        const snake = new Snake(new Point(5, 5), new Direction(Direction.RIGHT));
        snake.turnRight();
        expect(snake.getDirection().value).toBe(Direction.DOWN);
        snake.turnRight();
        expect(snake.getDirection().value).toBe(Direction.LEFT);
        snake.turnRight();
        expect(snake.getDirection().value).toBe(Direction.UP);
        snake.turnRight();
        expect(snake.getDirection().value).toBe(Direction.RIGHT);
    });

    it('should be able to turn left', () => {
        const snake = new Snake(new Point(5, 5), new Direction(Direction.RIGHT));
        snake.turnLeft();
        expect(snake.getDirection().value).toBe(Direction.UP);
        snake.turnLeft();
        expect(snake.getDirection().value).toBe(Direction.LEFT);
        snake.turnLeft();
        expect(snake.getDirection().value).toBe(Direction.DOWN);
        snake.turnLeft();
        expect(snake.getDirection().value).toBe(Direction.RIGHT);
    });

    it('should move entire body', () => {
        const snake = new Snake(new Point(5, 5), new Direction(Direction.RIGHT));
        snake.move().grow().turnRight().move().grow().move().grow();
        expect(snake.getPoints()).toHaveLength(4);
        expect(snake.getHead().equals(new Point(6, 7))).toBe(true);
        expect(snake.getPoints()[1].equals(new Point(6, 6))).toBe(true);
        expect(snake.getPoints()[2].equals(new Point(6, 5))).toBe(true);
        expect(snake.getPoints()[3].equals(new Point(5, 5))).toBe(true);
    });

    it('should have a color', () => {
        expect((new Snake).color).toBeTruthy();
    });
});
