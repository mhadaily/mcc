import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vimeo-training', 'Integration | Component | vimeo training', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{vimeo-training}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#vimeo-training}}
      template block text
    {{/vimeo-training}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
