import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('integration | Component | navbar', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const user = this.server.create('user');

    this.set('sessionService.currentUser', user);
    await render(hbs`<Navbar/>`);
  });

  test('It renders', async function (assert) {
    assert
      .dom('[data-test-username]')
      .hasText(
        `${this.sessionService.currentUser.username}`,
        'Displays logged user username'
      );
    assert
      .dom('[data-test-user-avatar]')
      .hasAttribute(
        'src',
        `${this.sessionService.currentUser.avatarURL}`,
        'Displays logged user avatar'
      );
  });
});
