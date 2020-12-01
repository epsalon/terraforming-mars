import {expect} from 'chai';
import {NuclearZone} from '../../../src/cards/base/NuclearZone';
import {Game} from '../../../src/Game';
import {TileType} from '../../../src/TileType';
import {TestPlayers} from '../../TestingUtils';

describe('NuclearZone', function() {
  it('Should play', function() {
    const card = new NuclearZone();
    const player = TestPlayers.BLUE.newPlayer();
    const game = new Game('foobar', [player, player], player);
    const action = card.play(player, game);
    if (action !== undefined) {
      const space = action.availableSpaces[0];
      action.cb(space);
      expect(space.tile && space.tile.tileType).to.eq(TileType.NUCLEAR_ZONE);
      player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
      expect(player.victoryPointsBreakdown.victoryPoints).to.eq(-2);
      expect(space.adjacency?.cost).eq(undefined);
    }
    expect(game.getTemperature()).to.eq(-26);
  });
});
