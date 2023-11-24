import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | session', function (hooks) {
  setupTest(hooks);

  test('placeholder api test', async function (assert) {
    const session = this.owner.lookup('service:session');
    const data = await session.fetchSomething();

    const expectedData = {
      completed: false,
      id: 1,
      title: 'delectus aut autem',
      userId: 1,
    };
    assert.deepEqual(data, expectedData);

    const putData = await session.putRecord('1', {
      completed: true,
      id: 1,
      title: 'new Title',
      userId: 1,
    });
    assert.deepEqual(putData, {
      completed: true,
      id: 1,
      title: 'new Title',
      userId: 1,
    });

    const patchdata = await session.patchRecord('1', {
      title: 'second new Title',
    });
    assert.deepEqual(patchdata, {
      completed: false,
      id: 1,
      title: 'second new Title',
      userId: 1,
    });
  });
});
