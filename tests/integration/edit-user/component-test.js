import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { faker } from '@faker-js/faker';

module('integration | Component | edit-user', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    const user = this.server.create('user');
    this.set('user', user);

    await render(hbs`<EditUser @user={{this.user}} />`);
  });

  test('User editor renders', async function (assert) {
    assert
      .dom('[data-test-save-button]')
      .hasAttribute('disabled', '', 'Save button is disabled before changes');
    assert
      .dom('[data-test-cancel-button]')
      .hasAttribute('disabled', '', 'Cancel button is disabled before changes');

    assert.dom('[data-test-avatarChooser]').exists();
    assert.dom('[data-test-input-username]').exists();
    assert.dom('[data-test-input-email]').exists();
    assert.dom('[data-test-input-photoURL]').exists();
    assert.dom('[data-test-input-password]').exists();
  });

  test('User editor data change', async function (assert) {
    assert
      .dom('[data-test-save-button]')
      .hasAttribute('disabled', '', 'Save button is disabled before changes');
    assert
      .dom('[data-test-cancel-button]')
      .hasAttribute('disabled', '', 'Cancel button is disabled before changes');

    await click('[data-test-avatar="5"]');
    await fillIn('[data-test-input-email]', 'test@email');
    await fillIn('[data-test-input-photoURL]', faker.image.avatar());
    await fillIn('[data-test-input-username]', `testUsername`);
    await fillIn('[data-test-input-password]', `testPassword`);

    assert
      .dom('[data-test-save-button]')
      .hasAttribute(
        'disabled',
        '',
        'Save button is disabled with uncorrect changes'
      );
    assert
      .dom('[data-test-cancel-button]')
      .hasNoAttribute(
        'disabled',
        '',
        'Cancel button is not disabled when data changes'
      );

    await fillIn('[data-test-input-email]', 'test@email.com');
    await fillIn('[data-test-input-photoURL]', faker.image.avatar());
    await fillIn('[data-test-input-username]', `testUsername`);
    await fillIn('[data-test-input-password]', `testPassword1!`);

    const clickedAvatarURL = find('[data-test-avatar="5"]').getAttribute('src');

    await click('[data-test-save-button]');
    assert.dom('[data-test-modal]').exists();
    assert
      .dom('[data-test-user-avatarURL]')
      .hasAttribute('src', clickedAvatarURL);
    assert.dom('[data-test-user-username]').includesText('testUsername');
    assert.dom('[data-test-user-email]').includesText('test@email.com');
    assert.dom('[data-test-user-password]').includesText('testPassword1!');
  });

  test('User editor data cancel', async function (assert) {
    await click('[data-test-avatar="5"]');
    await fillIn('[data-test-input-email]', 'test@email');
    await fillIn('[data-test-input-photoURL]', faker.image.avatar());
    await fillIn('[data-test-input-username]', `testUsername`);
    await fillIn('[data-test-input-password]', `testPassword`);

    await click('[data-test-cancel-button]');
    assert
      .dom('[data-test-save-button]')
      .hasAttribute(
        'disabled',
        '',
        'Save button is disabled due to canceled changes'
      );
    assert
      .dom('[data-test-cancel-button]')
      .hasAttribute(
        'disabled',
        '',
        'Cancel button is disabled due to canceled changes'
      );
    assert
      .dom('[data-test-input-username]')
      .hasValue(
        `${this.user.username}`,
        'After cancel username rollback to previous value'
      );
    assert
      .dom('[data-test-input-password]')
      .hasValue(
        `${this.user.password}`,
        'After cancel password rollback to previous value'
      );
    assert
      .dom('[data-test-input-email]')
      .hasValue(
        `${this.user.email}`,
        'After cancel email rollback to previous value'
      );
    assert
      .dom('[data-test-input-photoURL]')
      .hasValue(
        `${this.user.photoURL}`,
        'After cancel photoURL rollback to previous value'
      );
  });

  test('User editor correct data save', async function (assert) {
    await click('[data-test-avatar="5"]');
    await fillIn('[data-test-input-email]', 'test@email.com');
    await fillIn('[data-test-input-photoURL]', faker.image.avatar());
    await fillIn('[data-test-input-username]', `testUsername`);
    await fillIn('[data-test-input-password]', `testPassword1!`);
    const changedPhotoUrl = find('[data-test-input-photoURL]').value;

    await click('[data-test-save-button]');

    assert
      .dom('[data-test-input-username]')
      .hasValue('testUsername', 'Preview uesrname is correct');
    assert
      .dom('[data-test-input-password]')
      .hasValue('testPassword1!', 'Preview password is correct');
    assert
      .dom('[data-test-input-email]')
      .hasValue('test@email.com', 'Preview email is correct');
    assert
      .dom('[data-test-input-photoURL]')
      .hasValue(changedPhotoUrl, 'Preview photo is correct');

    await click('[data-test-confirm-button]');
    assert
      .dom('[data-test-input-username]')
      .hasValue('testUsername', 'After save username is changed');
    assert
      .dom('[data-test-input-password]')
      .hasValue('testPassword1!', 'After save password is changed');
    assert
      .dom('[data-test-input-email]')
      .hasValue('test@email.com', 'After save email is changed');
    assert
      .dom('[data-test-input-photoURL]')
      .hasValue(changedPhotoUrl, 'After save photo is changed');
    assert
      .dom('[data-test-save-button]')
      .hasAttribute(
        'disabled',
        '',
        'Save button is disabled after saved changes'
      );
    assert
      .dom('[data-test-cancel-button]')
      .hasAttribute(
        'disabled',
        '',
        'Cancel button is disabled after saved changes'
      );
  });
});
