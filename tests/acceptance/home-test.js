import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | index', function (hooks) {
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

  test('visiting /home', async function (assert) {
    await visit('/');
    await click('[data-test-carousel-prev]');
    await click('[data-test-carousel-next]');

    assert.dom('[data-test-game-carousel]').exists('Game carousel renders');
    assert.dom('[data-test-topUser]').exists('Top player card renders');

    assert.strictEqual(currentURL(), '/', 'Correct url');
  });
});
