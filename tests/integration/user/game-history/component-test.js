import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('integration | Component | user/game-history', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('Game History renders', async function (assert) {
    this.sessionService = this.owner.lookup('service:session');
    const store = this.owner.lookup('service:store');
    const user = this.server.create('user');
    const userModel = await store.findRecord('user', user.id);

    const gamehistory1 = this.server.create('game-history', {
      gameName: 'Whac a Mole',
      date: new Date(2022, 6, 13, 21, 37),
      points: 12,
      player: userModel.id,
    });
    const gamehistory2 = this.server.create('game-history', {
      gameName: 'Whac a Mole',
      date: new Date(2022, 3, 24, 16, 20),
      points: 30,
      player: userModel.id,
    });
    const gamehistory3 = this.server.create('game-history', {
      gameName: 'Memory',
      date: new Date(2022, 6, 12, 9, 11),
      points: 70,
      player: userModel.id,
    });
    const gamehistory4 = this.server.create('game-history', {
      gameName: 'Memory',
      date: new Date(2022, 6, 12, 11, 11),
      points: 50,
      player: userModel.id,
    });
    this.set('user', userModel);

    const gamesHistories = await store.findAll('game-history');
    this.set('game-history', gamesHistories);

    await render(hbs`<User::GameHistory @model={{this.user}}/>`);

    assert.dom('[data-test-history-table]').exists();
  });
});
