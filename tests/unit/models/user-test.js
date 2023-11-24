import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Model | user', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('user creation', async function (assert) {
    const store = this.owner.lookup('service:store');

    const user = await store.createRecord('user', {
      username: 'dawidD',
      password: 'testPasword',
      email: 'example@mail.com',
      photoURL: 'link.com',
      avatarURL: 'avatarlink.com',
      whacamoleTopScore: 15,
      memoryTopScore: 10,
    });

    assert.deepEqual(user.username, 'dawidD');
    assert.deepEqual(user.password, 'testPasword');
    assert.deepEqual(user.email, 'example@mail.com');
    assert.deepEqual(user.photoURL, 'link.com');
    assert.deepEqual(user.avatarURL, 'avatarlink.com');
    assert.deepEqual(user.whacamoleTopScore, 15);
    assert.deepEqual(user.memoryTopScore, 10);
    assert.false(user.isAdmin);
    assert.false(user.isDeleted);
  });

  test('user from mirage', async function (assert) {
    this.server.loadFixtures();
    const store = this.owner.lookup('service:store');
    const user = await store.findRecord('user', 2);

    assert.deepEqual(user.username, 'Dawid');
    assert.deepEqual(user.password, 'abc123');
    assert.deepEqual(user.email, 'example@mail.com');
    assert.deepEqual(user.photoURL, 'photo.com');
    assert.deepEqual(user.avatarURL, 'avatar.com');
    assert.deepEqual(user.whacamoleTopScore, 15);
    assert.deepEqual(user.memoryTopScore, 10);
    assert.false(user.isAdmin);
    assert.false(user.isDeleted);

    user.set('username', 'newName');
    await user.save();

    assert.deepEqual(user.username, 'newName');
    assert.deepEqual(user.password, 'abc123');
    assert.deepEqual(user.email, 'example@mail.com');
    assert.deepEqual(user.photoURL, 'photo.com');
    assert.deepEqual(user.avatarURL, 'avatar.com');
    assert.deepEqual(user.whacamoleTopScore, 15);
    assert.deepEqual(user.memoryTopScore, 10);
    assert.false(user.isAdmin);
    assert.false(user.isDeleted);
  });

  test('users list mirage', async function (assert) {
    this.server.loadFixtures();
    const store = this.owner.lookup('service:store');
    const users = await store.findAll('user');

    assert.deepEqual(users.length, 2);
  });
});
