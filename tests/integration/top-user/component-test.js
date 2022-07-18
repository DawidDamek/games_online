import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('integration | Component | top-user', function (hooks) {
  setupRenderingTest(hooks);

  test('TopPlayer renders', async function (assert) {
    const topPlay = {
      points: '1',
      date: new Date(2022, 6, 18),
      player: {
        username: 'testName',
        avatarURL: '/assets/images/icons/lion.png',
      },
    };
    this.set('topPlay', topPlay);
    await render(
      hbs`
      <TopUser @title='Memory top player' @topPlay={{this.topPlay}} />
      `
    );
    assert
      .dom('[data-test-title]')
      .hasText('Memory top player', 'title renders correctly');
    assert
      .dom('[data-test-player-username]')
      .hasText(`${this.topPlay.player.username}`, 'Username renders correctly');
    assert
      .dom('[data-test-player-avatarURL]')
      .hasAttribute(
        'src',
        `${this.topPlay.player.avatarURL}`,
        'User avatar renders correctly'
      );
    assert
      .dom('[data-test-points]')
      .hasText(
        `Points: ${this.topPlay.points}`,
        'Displays correct ammount of points'
      );

    assert
      .dom('[data-test-date]')
      .hasText('Set on: 18-07-2022', 'Displays correct date');
  });
});
