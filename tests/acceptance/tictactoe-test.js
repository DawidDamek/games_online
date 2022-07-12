import { module, test } from 'qunit';
import { visit, currentURL, click, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | tictactoe', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: '1' })
    );
  });

  hooks.afterEach(function () {
    window.localStorage.clear();
  });

  test('visiting /tictactoe', async function (assert) {
    await visit('/tictactoe');
    await waitFor('[data-test-gameMode-button]');
    await click('[data-test-gameMode-button]');

    await waitFor('[data-test-start-button]');
    await click('[data-test-start-button]');

    await waitFor('[data-test-reset-button]');
    await click('[data-test-reset-button]');

    assert.strictEqual(currentURL(), '/tictactoe');
  });
});
