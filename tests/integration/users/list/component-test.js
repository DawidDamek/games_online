import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { faker } from '@faker-js/faker';

module('integration | Component | users/list', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    const users = [
      {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        avatarURL: faker.image.avatar(),
        whacamoleTopScore: '0lowestWhacPts',
        memoryTopScore: '9highestMemoryPts',
      },
      {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        avatarURL: faker.image.avatar(),
        whacamoleTopScore: '5midWhacPts',
        memoryTopScore: '5midMemoryPts',
      },
      {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        avatarURL: faker.image.avatar(),
        whacamoleTopScore: '9highestWhacPts',
        memoryTopScore: '0lowestMemoryPts',
      },
    ];
    this.set('user', users);
  });

  test('User list renders default', async function (assert) {
    await render(
      hbs`
       <Users::List
        @users={{this.user}}
        @sortMemory={{null}}
        @sortWhacamole={{null}}
       />
      `
    );
    assert
      .dom('[data-test-row="0"]')
      .includesText(
        `${this.user.firstObject.username}`,
        'First user is on first position by default'
      );
    assert
      .dom('[data-test-row="1"]')
      .includesText(
        `${this.user[1].username}`,
        'Second user is on mid position by default'
      );

    assert
      .dom('[data-test-row="2"]')
      .includesText(
        `${this.user.lastObject.username}`,
        'Third user is on last position by default'
      );
  });

  test('User list renders by Memory DESC', async function (assert) {
    await render(
      hbs`
       <Users::List
        @users={{this.user}}
        @sortMemory="DESC"
        @sortWhacamole={{null}}
       />
      `
    );
    assert
      .dom('[data-test-row="0"]')
      .includesText(
        `9highestMemoryPts`,
        'Top memory player is on first position'
      );
    assert
      .dom('[data-test-row="1"]')
      .includesText(`5midMemoryPts`, 'Mid memory player is on mid position');

    assert
      .dom('[data-test-row="2"]')
      .includesText(
        `0lowestMemoryPts`,
        'Weakest memory player is on last position'
      );
  });

  test('User list renders by Memory ASC', async function (assert) {
    await render(
      hbs`
       <Users::List
        @users={{this.user}}
        @sortMemory="ASC"
        @sortWhacamole={{null}}
       />
      `
    );
    assert
      .dom('[data-test-row="0"]')
      .includesText(
        `0lowestMemoryPts`,
        'Weakest memory player is on first position'
      );
    assert
      .dom('[data-test-row="1"]')
      .includesText(`5midMemoryPts`, 'Mid memory player is on mid position');

    assert
      .dom('[data-test-row="2"]')
      .includesText(
        `9highestMemoryPts`,
        'Top memory player is on last position'
      );
  });

  test('User list renders by Whac a Mole DESC', async function (assert) {
    await render(
      hbs`
       <Users::List
        @users={{this.user}}
        @sortMemory={{null}}
        @sortWhacamole='DESC'
       />
      `
    );
    assert
      .dom('[data-test-row="0"]')
      .includesText(
        `9highestWhacPts`,
        'Top Whac a Mole  player is on first position'
      );
    assert
      .dom('[data-test-row="1"]')
      .includesText(`5midWhacPts`, 'Mid Whac a Mole player is on mid position');

    assert
      .dom('[data-test-row="2"]')
      .includesText(
        `0lowestWhacPts`,
        'Weakest Whac a Mole player is on last position'
      );
  });

  test('User list renders by Whac a Mole ASC', async function (assert) {
    await render(
      hbs`
       <Users::List
        @users={{this.user}}
        @sortMemory={{null}}
        @sortWhacamole="ASC"
       />
      `
    );
    assert
      .dom('[data-test-row="0"]')
      .includesText(
        `0lowestWhacPts`,
        'Weakest Whac a Mole player is on first position'
      );
    assert
      .dom('[data-test-row="1"]')
      .includesText(`5midWhacPts`, 'Mid Whac a Mole player is on mid position');

    assert
      .dom('[data-test-row="2"]')
      .includesText(
        `9highestWhacPts`,
        'Top Whac a Mole player is on last position'
      );
  });
});
