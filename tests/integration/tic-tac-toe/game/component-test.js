import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('integration | Component | tictactoe/game', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const store = this.owner.lookup('service:store');
    const user = store.createRecord('user');

    this.set('sessionService.currentUser', user);

    await render(hbs`<TicTacToe::Game />`);
  });

  test('validation test', async function (assert) {
    Array(9)
      .fill('data-test-disabledBlock')
      .map((selector, index) => {
        assert
          .dom(`[${selector}="${index}"]`)
          .exists(`Non clickable block ${index} exists before start`)
          .hasNoAttribute('role', 'and has no attribute role');
      });

    assert
      .dom('[data-test-start-button]')
      .hasNoAttribute('disabled', 'start button can be clicked');

    assert
      .dom('[data-test-gameMode-display]')
      .hasText('Game mode:Singleplayer', 'default game mode is Singleplayer');
    await click('[data-test-gameMode-button]');
    assert
      .dom('[data-test-gameMode-display]')
      .hasText(
        'Game mode:Multiplayer',
        'after click on game mode button mode changes on multiplayer'
      );

    await click('[data-test-start-button]');
    assert.dom('[data-test-start-button]').hasAttribute('disabled');

    Array(9)
      .fill('data-test-disabledBlock')
      .map((selector, index) => {
        assert
          .dom(`[${selector}="${index}"]`)
          .doesNotExist(
            `Non clickable block ${index} does not exist after start`
          );
      });

    Array(9)
      .fill('data-test-clickBlock')
      .map((selector, index) => {
        assert
          .dom(`[${selector}="${index}"]`)
          .exists(`Clickable block ${index} exists after start`)
          .hasAttribute('role', 'button', 'and has attribute role');
      });
    Array(9)
      .fill('data-test-clickBlock')
      .map((selector, index) => {
        click(`[${selector}="${index}"]`);
      });

    assert
      .dom('[data-test-clickBlock="7"]')
      .hasNoText('block 7 should be empty');
    assert
      .dom('[data-test-clickBlock="8"]')
      .hasNoText('block 8 should be empty');

    await click('[data-test-reset-button]');
    Array(9)
      .fill('data-test-disabledBlock')
      .map((selector, index) => {
        assert
          .dom(`[${selector}="${index}"]`)
          .exists(`Non clickable block ${index} exists after reset`)
          .hasNoAttribute('role', 'and has no attribute role');
      });
    Array(9)
      .fill('data-test-clickBlock')
      .map((selector, index) => {
        assert
          .dom(`[${selector}="${index}"]`)
          .doesNotExist(`Clickable block ${index} does not exist after start`);
      });
  });

  test('multiplayer test', async function (assert) {
    await click('[data-test-gameMode-button]');
    assert
      .dom('[data-test-gameMode-display]')
      .hasText('Game mode:Multiplayer', 'game mode is changed to multiplayer');

    await click('[data-test-start-button]');

    await click('[data-test-clickBlock="0"]');
    assert.dom('[data-test-clickBlock="0"]').hasText('𝗫', 'first click is X');

    await click('[data-test-clickBlock="1"]');
    assert.dom('[data-test-clickBlock="1"]').hasText('O', 'second click is O');

    await click('[data-test-clickBlock="3"]');
    await click('[data-test-clickBlock="4"]');
    await click('[data-test-clickBlock="6"]');

    assert
      .dom('[data-test-winner-display]')
      .hasText('Winner Is: 𝗫', 'Winner is X');

    await click('[data-test-clickBlock="8"]');
    assert.dom('[data-test-clickBlock="8"]').hasNoText();

    assert
      .dom('[data-test-gameMode-button]')
      .hasAttribute(
        'disabled',
        '',
        'game mode button is disabled when game is started'
      );

    await click('[data-test-reset-button]');
    Array(9)
      .fill('data-test-disabledBlock')
      .map((selector, index) => {
        assert
          .dom(`[${selector}="${index}"]`)
          .exists(`non clickable block ${index} exist after reset`);
      });

    assert
      .dom('[data-test-start-button]')
      .hasNoAttribute('disabled', 'start button is not disabled after reset');
    assert
      .dom('[data-test-gameMode-button]')
      .hasNoAttribute(
        'disabled',
        'game mode button is not disabled after reset'
      );
  });

  test('singleplayer test', async function (assert) {
    assert
      .dom('[data-test-gameMode-display]')
      .hasText('Game mode:Singleplayer');

    await click('[data-test-start-button]');

    await click('[data-test-clickBlock="0"]');
    assert
      .dom('[data-test-clickBlock="0"]')
      .hasText('𝗫', 'clicked block has text 𝗫');
    assert
      .dom('[data-test-clickBlock-symbol="O"]')
      .exists('computer clicked random block and marked O');

    await click('[data-test-reset-button]');

    Array(9)
      .fill('data-test-clickBlock')
      .map((selector, index) => {
        assert
          .dom(`[${selector}="${index}"]`)
          .doesNotExist(`after reset clickable block ${index} does not exist`);
      });
  });
});
