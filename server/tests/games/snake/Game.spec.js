const Game = require('../../../src/games/snake/Game');

describe('Game tests', () => {
    it('should spawn one candy on init', () => {
        const game = new Game;
        game.init();
        expect(game.state.candies).toHaveLength(1);
    });

    it('should be able to add players', () => {
        const game = new Game;
        game.init();
        expect(game.players).toHaveLength(0);
        game.join();
        expect(game.players).toHaveLength(1);
    });

    it('should be able to remove players', () => {
        const game = new Game;
        game.init();
        expect(game.players).toHaveLength(0);
        const id = game.join();
        expect(game.players).toHaveLength(1);
        game.leave(id);
        expect(game.players).toHaveLength(0);
    });

    it('should be able to turn a player', () => {
        const mockState = { applyEvent: jest.fn() };
        const game = new Game(mockState);
        const id = game.join();
        game.playerTurn(id, 'left');
        expect(mockState.applyEvent).toHaveBeenLastCalledWith({ type: 'turnSnake', payload: { id, direction: 'left' }});
    });

    it('should call update on tick', () => {
        const mockState = { applyEvent: jest.fn() };
        const game = new Game(mockState);
        game.tick();
        expect(mockState.applyEvent).toHaveBeenLastCalledWith({ type: 'update' });
    });
});
