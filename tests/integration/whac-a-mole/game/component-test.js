import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, waitFor } from '@ember/test-helpers';
import WhacAMoleGameComponent from 'games-online/components/whac-a-mole/game/component';
import { hbs } from 'ember-cli-htmlbars';
import Timer from 'ember-stopwatch/utils/timer';

module('integration | Component | whac-a-mole/game', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const store = this.owner.lookup('service:store');
    const user = store.createRecord('user');

    this.set('sessionService.currentUser', user);

    class EnrichedWhacAMoleGameComponent extends WhacAMoleGameComponent {
      time = 3000;

      constructor() {
        super(...arguments);

        this.timer = new Timer(this.time);
      }
    }
    this.owner.register(
      'component:whac-a-mole/game',
      EnrichedWhacAMoleGameComponent
    );
    await render(hbs`<WhacAMole::Game />`);
  });

  test('validation test', async function (assert) {
    assert
      .dom('[data-test-moleSquare]')
      .doesNotExist('mole does not exist before start');
    Array(9)
      .fill('data-test-whiteSquare')
      .map((selector, index) =>
        assert
          .dom(`[${selector}="${index}"]`)
          .hasNoAttribute('role', `white square ${index} is not clickable`)
      );
    const selectors = Array(9).fill('data-test-whiteSquare');
    for (const [i, selector] of selectors.entries()) {
      await click(`[${selector}="${i}"]`);
    }
    assert.dom('[data-test-hits]').hasText('Number of hits:0');
    assert.dom('[data-test-start-button]').hasText('start');
    assert.dom('[data-test-stop-button]').hasText('stop');
    assert.dom('[data-test-reset-button]').hasText('reset');

    await click('[data-test-start-button]');
    await waitFor('[data-test-moleSquare]');
    assert.dom('[data-test-moleSquare]').exists('mole exists after start');
    assert.dom('[data-test-moleSquare]').hasAttribute('role');
    await click('[data-test-moleSquare]');
    assert
      .dom('[data-test-hits]')
      .hasText('Number of hits:1', 'hitting a mole adds point');
  });

  test('easy mode test', async function (assert) {
    await click('[data-test-easy-button]');
    await click('[data-test-start-button]');

    await waitFor('[data-test-moleSquare]', { timeout: 3000 });
    await click('[data-test-moleSquare]');

    await waitFor('[data-test-finalScore]', {
      timeout: 3000,
    });
    assert.dom('[data-test-finalScore]').hasText('Your final score is: 1');
  });

  test('medium mode test', async function (assert) {
    await click('[data-test-medium-button]');
    await click('[data-test-start-button]');

    await waitFor('[data-test-moleSquare]', { timeout: 3000 });
    await click('[data-test-moleSquare]');

    await waitFor('[data-test-finalScore]', {
      timeout: 3000,
    });
    assert.dom('[data-test-finalScore]').hasText('Your final score is: 1.5');
  });

  test('hard mode test', async function (assert) {
    await click('[data-test-hard-button]');
    await click('[data-test-start-button]');

    await waitFor('[data-test-moleSquare]', { timeout: 3000 });
    await click('[data-test-moleSquare]');

    await waitFor('[data-test-finalScore]', {
      timeout: 3000,
    });
    assert.dom('[data-test-finalScore]').hasText('Your final score is: 5');
  });
});
