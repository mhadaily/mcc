import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('funding-tag-modal', 'Integration | Component | funding tag modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{funding-tag-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#funding-tag-modal}}
      template block text
    {{/funding-tag-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
