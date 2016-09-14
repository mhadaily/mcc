import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  title: null,
  placement: 'bottom',
  didInsertElement(title, placement) {
    this._super(...arguments);
    this.set('title', title);
    this.set('placement', placement);
    this.$(this.element).find('a').tooltip({ container: 'body' });
  }
});
