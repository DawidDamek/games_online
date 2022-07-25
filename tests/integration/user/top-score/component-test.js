import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('integration | Component | user/top-scores', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('Top scores renders', async function (assert) {
    const user = this.server.create('user');
    this.set('user', user);

    await render(
      hbs`
         <User::TopScores @user={{this.user}} />
      `
    );

    assert
      .dom('[data-test-whacamoleTopScore]')
      .hasText(
        `${this.user.whacamoleTopScore}`,
        'Displays correct whacamole points'
      );
    assert
      .dom('[data-test-memoryTopScore]')
      .hasText(`${this.user.memoryTopScore}`, 'Displays correct memory points');

    assert
      .dom('[data-test-username]')
      .hasText(`${this.user.username} top scores`, 'Displays correct username');
  });
});
