import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  title: null,
  didInsertElement(title) {
    this._super(...arguments);
    this.set('title', title);
    this.$(this.element).find('a').tooltip({ container: 'body' });
  }
});
