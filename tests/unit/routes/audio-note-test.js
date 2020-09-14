import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | audio-note', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:audio-note');
    assert.ok(route);
  });
});
