import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | memory', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /memory', async function (assert) {
    await visit('/memory');
    await click('[data-test-start-button]');

    assert.strictEqual(currentURL(), '/memory');
  });
});
