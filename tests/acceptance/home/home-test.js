import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.server.loadFixtures();

    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: '1' })
    );

    this.sessionService = this.owner.lookup('service:session');
    const store = await this.owner.lookup('service:store');

    const loggedUserModel = await store.findRecord('user', '1');

    this.set('store', store);
    this.set('sessionService.currentUser', loggedUserModel);

    const gamesHistories = await store.findAll('game-history');
    this.set('game-history', gamesHistories);
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
