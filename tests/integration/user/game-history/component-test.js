import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, doubleClick, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('integration | Component | user/game-history', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
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
  });

  test('Game History renders', async function (assert) {
    assert
      .dom('[data-test-history-table]')
      .exists('Games history table exists');
    assert
      .dom('[data-test-sort-game]')
      .hasText('Game', 'Game column has correct label');
    assert
      .dom('[data-test-sort-points]')
      .hasText('Points', 'Points column has correct label');
    assert
      .dom('[data-test-sort-date]')
      .hasText('Date', 'Date column has correct label');

    Array(4)
      .fill('data-test-history-row')
      .map((selector, index) => {
        assert
          .dom(`[${selector}="${index}"]`)
          .exists(`Game history table row ${index + 1} exists`);
      });
  });

  test('Game History sort switching', async function (assert) {
    await click('[data-test-sort-game]');
    assert
      .dom('[data-test-sort-game]')
      .hasText('Game ↓', 'After click game DESC arrow appears');
    assert
      .dom('[data-test-sort-date]')
      .hasText('Date', 'When sorting by game Date has no arrow');
    assert
      .dom('[data-test-sort-Points]')
      .hasText('Points', 'When sorting by game Points has no arrow');

    await click('[data-test-sort-points]');
    assert
      .dom('[data-test-sort-points]')
      .hasText('Points ↓', 'After click Points DESC arrow appears');
    assert
      .dom('[data-test-sort-game]')
      .hasText('Game', 'When sorting by Points Game has no arrow');
    assert
      .dom('[data-test-sort-date]')
      .hasText('Date', 'When sorting by Points Date has no arrow');

    await click('[data-test-sort-date]');
    assert
      .dom('[data-test-sort-date]')
      .hasText('Date ↓', 'After click Date DESC arrow appears');
    assert
      .dom('[data-test-sort-points]')
      .hasText('Points', 'When sorting by Date Points has no arrow');
    assert
      .dom('[data-test-sort-game]')
      .hasText('Game', 'When sorting by Date Game has no arrow');

    await click('[data-test-sort-points]');
    assert
      .dom('[data-test-sort-points]')
      .hasText(
        'Points ↓',
        'points-label-tooggle After first click Points DESC arrow appears'
      );

    await click('[data-test-sort-points]');
    assert
      .dom('[data-test-sort-points]')
      .hasText(
        'Points ↑',
        'points-label-tooggle After second click Points ASC arrow appears'
      );

    await click('[data-test-sort-points]');
    assert
      .dom('[data-test-sort-points]')
      .hasText(
        'Points',
        'points-label-tooggle After third click Points arrow disappears'
      );

    await click('[data-test-sort-date]');
    assert
      .dom('[data-test-sort-date]')
      .hasText(
        'Date ↓',
        'date-label-tooggle After first click Date DESC arrow appears'
      );

    await click('[data-test-sort-date]');
    assert
      .dom('[data-test-sort-date]')
      .hasText(
        'Date ↑',
        'date-label-tooggle After second click Date ASC arrow appears'
      );

    await click('[data-test-sort-date]');
    assert
      .dom('[data-test-sort-date]')
      .hasText(
        'Date',
        'date-label-tooggle After third click Date arrow disappears'
      );

    await click('[data-test-sort-game]');
    assert
      .dom('[data-test-sort-game]')
      .hasText(
        'Game ↓',
        'game-label-tooggle After first click Game DESC arrow appears'
      );

    await click('[data-test-sort-game]');
    assert
      .dom('[data-test-sort-game]')
      .hasText(
        'Game ↑',
        'game-label-tooggle After second click Game ASC arrow appears'
      );

    await click('[data-test-sort-game]');
    assert
      .dom('[data-test-sort-game]')
      .hasText(
        'Game',
        'game-label-tooggle After third click Game arrow disappears'
      );
  });
  test('Game History check sorting', async function (assert) {
    await click('[data-test-sort-game]');
    assert
      .dom('[data-test-history-row="0"]')
      .includesText('Memory', 'Sort by game DESC first item is Memory');
    assert
      .dom('[data-test-history-row="1"]')
      .includesText('Memory', 'Sort by game DESC second item is Memory');

    await click('[data-test-sort-game]');
    assert
      .dom('[data-test-history-row="0"]')
      .includesText(
        'Whac a Mole',
        'Sort by game ASC first item is Whac a mole'
      );
    assert
      .dom('[data-test-history-row="0"]')
      .includesText(
        'Whac a Mole',
        'Sort by game ASC second item is Whac a mole'
      );

    await doubleClick('[data-test-sort-points]');
    assert
      .dom('[data-test-history-row="0"]')
      .includesText('70', 'Sort by points DESC');

    await click('[data-test-sort-points]');
    assert
      .dom('[data-test-history-row="0"]')
      .includesText('12', 'Sort by points ASC');

    await click('[data-test-sort-date]');
    assert
      .dom('[data-test-history-row="0"]')
      .includesText('24-04-2022', 'Sort by date DESC');

    await click('[data-test-sort-date]');
    assert
      .dom('[data-test-history-row="0"]')
      .includesText('13-07-2022', 'Sort by date ASC');
  });
});
