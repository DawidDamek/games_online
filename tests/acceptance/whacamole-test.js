import { module, test } from 'qunit';
import { visit, currentURL, click, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | whacamole', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: '1' })
    );
  });

  hooks.afterEach(function () {
    window.localStorage.clear();
  });

  test('visiting /whacamole', async function (assert) {
    await visit('/whacamole');
    await waitFor('[data-test-start-button]');
    await click('[data-test-start-button]');
    assert.strictEqual(currentURL(), '/whacamole');
  });
});
