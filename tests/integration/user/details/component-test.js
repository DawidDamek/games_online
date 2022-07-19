import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('integration | Component | user/details', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('User details renders', async function (assert) {
    const user = this.server.create('user');
    this.set('user', user);

    await render(
      hbs`
       <User::Details @user={{this.user}}/>
      `
    );
    assert
      .dom('[data-test-user-photoURL]')
      .hasAttribute('src', `${this.user.photoURL}`, 'Correct user photo');
    assert
      .dom('[data-test-user-username]')
      .hasText(`${this.user.username}`, 'Correct username');
    assert
      .dom('[data-test-user-avatarURL]')
      .hasAttribute('src', `${this.user.avatarURL}`, 'Correct avatarURL');
    assert
      .dom('[data-test-user-id]')
      .hasText(`Unique ID: ${this.user.id}`, 'Correct user id');
    assert
      .dom('[data-test-user-email]')
      .hasText(`Email: ${this.user.email}`, 'Correct email');
    assert
      .dom('[data-test-user-password]')
      .hasText(`Password: ${this.user.password}`, 'Correct Password');
  });
});
