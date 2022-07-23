import { module, test } from 'qunit';
import { visit, currentURL, click, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | tictactoe', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.server.loadFixtures();

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
