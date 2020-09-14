import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | with-out-ember-concurrency', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:with-out-ember-concurrency');
    assert.ok(route);
  });
});
