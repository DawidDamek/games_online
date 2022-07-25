import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | users', function (hooks) {
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

  test('visiting /users', async function (assert) {
    await visit('/users');

    assert.dom('[data-test-row="0"]').exists();
    assert.strictEqual(currentURL(), '/users');
  });
});
