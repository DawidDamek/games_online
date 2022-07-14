import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('integration | Component | shared/model', function (hooks) {
  setupRenderingTest(hooks);

  test('Type info renders', async function (assert) {
    await render(
      hbs`
      <Shared::Modal 
        @title='Test title' 
        @modalInfoType={{true}}
      >
        Body text cotent
      </Shared::Modal>`
    );

    assert
      .dom('[data-test-title-content]')
      .hasText('Test title', 'Title has right content');
    assert
      .dom('[data-test-body-content]')
      .hasText('Body text cotent', 'Body has right content');
    assert.dom('[data-test-close-button]').exists('Close button exists');
  });

  test('Non info type renders', async function (assert) {
    await render(
      hbs`
      <Shared::Modal
        @title='Test title'
        @modalInfoType={{false}}
      >
        Body text cotent
      </Shared::Modal>`
    );

    assert
      .dom('[data-test-title-content]')
      .hasText('Test title', 'Title has right content');
    assert
      .dom('[data-test-body-content]')
      .hasText('Body text cotent', 'Body has right content');
    assert.dom('[data-test-confirm-button]').exists('Confirm button exists');
    assert.dom('[data-test-cancel-button]').exists('Cancel button exists');
  });
});
