import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import MemoryGameComponent from 'games-online/components/memory/game/component';

module('integration | Component | memory/game', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const store = this.owner.lookup('service:store');
    const user = store.createRecord('user');

    this.set('sessionService.currentUser', user);

    class EnrichedMemoryGameComponent extends MemoryGameComponent {
      shuffleCards() {
        this.shuffledCards = this.cardArray;
      }
    }
    this.owner.register('component:memory/game', EnrichedMemoryGameComponent);
    await render(hbs`<Memory::Game />`);
  });

  test('validation test', async function (assert) {
    assert.dom('[data-test-card-notStarted="0"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="1"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="2"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="3"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="4"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="5"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="6"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="7"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="8"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="9"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="10"]').hasNoAttribute('role');
    assert.dom('[data-test-card-notStarted="11"]').hasNoAttribute('role');

    await click('[data-test-start-button]');
    assert.dom('[data-test-start-button]').hasAttribute('disabled');

    await click('[data-test-card="0"]');
    assert.notEqual(
      find('[data-test-card="0"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 0'
    );
    await click('[data-test-card="1"]');
    assert
      .dom('[data-test-card="0"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 0'
      );
    assert
      .dom('[data-test-card="1"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 1'
      );

    await click('[data-test-card="1"]');
    assert.notEqual(
      find('[data-test-card="1"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 1'
    );
    await click('[data-test-card="2"]');
    assert
      .dom('[data-test-card="1"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 1'
      );
    assert
      .dom('[data-test-card="2"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 2'
      );

    await click('[data-test-card="2"]');
    assert.notEqual(
      find('[data-test-card="2"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 2'
    );
    await click('[data-test-card="3"]');
    assert
      .dom('[data-test-card="2"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 2'
      );
    assert
      .dom('[data-test-card="3"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 3'
      );

    await click('[data-test-card="3"]');
    assert.notEqual(
      find('[data-test-card="3"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 3'
    );
    await click('[data-test-card="4"]');
    assert
      .dom('[data-test-card="3"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 3'
      );
    assert
      .dom('[data-test-card="4"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 4'
      );

    await click('[data-test-card="4"]');
    assert.notEqual(
      find('[data-test-card="4"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 4'
    );
    await click('[data-test-card="5"]');
    assert
      .dom('[data-test-card="4"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 4'
      );
    assert
      .dom('[data-test-card="5"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 5'
      );

    await click('[data-test-card="5"]');
    assert.notEqual(
      find('[data-test-card="5"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 5'
    );
    await click('[data-test-card="6"]');
    assert
      .dom('[data-test-card="5"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 5'
      );
    assert
      .dom('[data-test-card="6"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 6'
      );

    await click('[data-test-card="7"]');
    assert.notEqual(
      find('[data-test-card="7"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 7'
    );
    await click('[data-test-card="8"]');
    assert
      .dom('[data-test-card="7"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 7'
      );
    assert
      .dom('[data-test-card="8"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 8'
      );

    await click('[data-test-card="8"]');
    assert.notEqual(
      find('[data-test-card="8"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 8'
    );
    await click('[data-test-card="9"]');
    assert
      .dom('[data-test-card="8"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 8'
      );
    assert
      .dom('[data-test-card="9"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 9'
      );

    await click('[data-test-card="9"]');
    assert.notEqual(
      find('[data-test-card="9"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 9'
    );
    await click('[data-test-card="10"]');
    assert
      .dom('[data-test-card="9"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 9'
      );
    assert
      .dom('[data-test-card="10"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 10'
      );

    await click('[data-test-card="10"]');
    assert.notEqual(
      find('[data-test-card="10"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 10'
    );
    await click('[data-test-card="11"]');
    assert
      .dom('[data-test-card="10"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 10'
      );
    assert
      .dom('[data-test-card="11"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 11'
      );

    await click('[data-test-card="11"]');
    assert.notEqual(
      find('[data-test-card="11"]').getAttribute('src'),
      '/assets/images/blank.png',
      'display flipped image card 11'
    );
    await click('[data-test-card="0"]');
    assert
      .dom('[data-test-card="11"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 11'
      );
    assert
      .dom('[data-test-card="0"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 0'
      );

    await click('[data-test-card="1"]');
    await click('[data-test-card="1"]');
    assert
      .dom('[data-test-card="1"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 1 after double click'
      );
    await click('[data-test-card="2"]');
    await click('[data-test-card="2"]');
    assert
      .dom('[data-test-card="2"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 2 after double click'
      );
    await click('[data-test-card="3"]');
    await click('[data-test-card="3"]');
    assert
      .dom('[data-test-card="3"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 3 after double click'
      );
    await click('[data-test-card="4"]');
    await click('[data-test-card="4"]');
    assert
      .dom('[data-test-card="4"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 4 after double click'
      );
    await click('[data-test-card="5"]');
    await click('[data-test-card="5"]');
    assert
      .dom('[data-test-card="5"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 5 after double click'
      );
    await click('[data-test-card="6"]');
    await click('[data-test-card="6"]');
    assert
      .dom('[data-test-card="6"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 6 after double click'
      );
    await click('[data-test-card="7"]');
    await click('[data-test-card="7"]');
    assert
      .dom('[data-test-card="7"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 7 after double click'
      );
    await click('[data-test-card="8"]');
    await click('[data-test-card="8"]');
    assert
      .dom('[data-test-card="8"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 8 after double click'
      );
    await click('[data-test-card="9"]');
    await click('[data-test-card="9"]');
    assert
      .dom('[data-test-card="9"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 9 after double click'
      );
    await click('[data-test-card="10"]');
    await click('[data-test-card="10"]');
    assert
      .dom('[data-test-card="10"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 10 after double click'
      );
    await click('[data-test-card="11"]');
    await click('[data-test-card="11"]');
    assert
      .dom('[data-test-card="11"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 0 after double click'
      );
    await click('[data-test-card="11"]');
    await click('[data-test-card="11"]');
    assert
      .dom('[data-test-card="11"]')
      .hasAttribute(
        'src',
        '/assets/images/blank.png',
        'display blank image card 11 after double click'
      );

    await click('[data-test-pause-button]');
    assert.dom('[data-test-start-button]').hasNoAttribute('disabled');
  });

  test('happy path', async function (assert) {
    await click('[data-test-start-button]');
    assert.dom('[data-test-start-button]').hasAttribute('disabled');

    await click('[data-test-card="0"]');
    await click('[data-test-card="6"]');
    assert.dom('[data-test-result]').hasText('Number of pairs: 1');

    await click('[data-test-card="1"]');
    await click('[data-test-card="7"]');
    assert.dom('[data-test-result]').hasText('Number of pairs: 2');

    await click('[data-test-card="2"]');
    await click('[data-test-card="8"]');
    assert.dom('[data-test-result]').hasText('Number of pairs: 3');

    await click('[data-test-card="3"]');
    await click('[data-test-card="9"]');
    assert.dom('[data-test-result]').hasText('Number of pairs: 4');

    await click('[data-test-card="4"]');
    await click('[data-test-card="10"]');
    assert.dom('[data-test-result]').hasText('Number of pairs: 5');

    await click('[data-test-card="5"]');
    await click('[data-test-card="11"]');
    assert.dom('[data-test-result]').hasText('Number of pairs: 6');

    await click('[data-test-reset-button]');
    assert
      .dom('[data-test-card-notStarted="0"]')
      .hasAttribute('src', '/assets/images/blank.png');
    assert
      .dom('[data-test-card-notStarted="1"]')
      .hasAttribute('src', '/assets/images/blank.png');
    assert
      .dom('[data-test-card-notStarted="2"]')
      .hasAttribute('src', '/assets/images/blank.png');
    assert
      .dom('[data-test-card-notStarted="3"]')
      .hasAttribute('src', '/assets/images/blank.png');
    assert
      .dom('[data-test-card-notStarted="4"]')
      .hasAttribute('src', '/assets/images/blank.png');
    assert
      .dom('[data-test-card-notStarted="5"]')
      .hasAttribute('src', '/assets/images/blank.png');
    assert
      .dom('[data-test-card-notStarted="6"]')
      .hasAttribute('src', '/assets/images/blank.png');

    const time = parseInt(find('[data-test-time]').textContent);
    assert.notEqual(time, 0);

    assert.dom('[data-test-score').includesText('200');
  });
});
