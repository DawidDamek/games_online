import { module, test } from 'qunit';
import { visit, currentURL, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | user/show', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: '1' })
    );

    this.sessionService = this.owner.lookup('service:session');
    const store = await this.owner.lookup('service:store');

    const loggedUser = await this.server.create('user');
    const loggedUserModel = await store.findRecord('user', loggedUser.id);

    this.set('store', store);
    this.set('sessionService.currentUser', loggedUserModel);

    this.server.create('game-history', {
      gameName: 'Whac a Mole',
      date: new Date(2022, 3, 24, 16, 20),
      points: 30,
      playerId: loggedUserModel.id,
    });
    this.server.create('game-history', {
      gameName: 'Memory',
      date: new Date(2022, 6, 12, 9, 11),
      points: 70,
      playerId: loggedUserModel.id,
    });
    const gamesHistories = await store.findAll('game-history');
    this.set('game-history', gamesHistories);

    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: loggedUserModel.id })
    );
  });

  hooks.afterEach(function () {
    window.localStorage.clear();
  });

  test('visiting /user/id', async function (assert) {
    await visit(`/user/1`);

    await waitFor('[data-test-user-photoURL]', { timeout: 5000 });

    assert.strictEqual(currentURL(), `/user/1`);
  });
});
