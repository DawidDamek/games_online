import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | user-settings', function (hooks) {
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

  test('visiting /profile', async function (assert) {
    await visit('/profile');

    assert
      .dom('[data-test-save-button]')
      .hasAttribute('disabled', '', 'Save button is disabled before changes');
    assert
      .dom('[data-test-cancel-button]')
      .hasAttribute('disabled', '', 'Cancel button is disabled before changes');
    assert.strictEqual(currentURL(), '/profile');
  });
});
