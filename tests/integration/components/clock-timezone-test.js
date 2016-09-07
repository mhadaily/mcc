import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('clock-timezone', 'Integration | Component | clock timezone', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{clock-timezone}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#clock-timezone}}
      template block text
    {{/clock-timezone}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
