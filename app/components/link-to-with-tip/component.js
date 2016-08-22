import Ember from 'ember';

export default Ember.LinkComponent.extend({
  didInsertElement() {
    this._super(...arguments);
    this.$(this.element).find('a').tooltip();
    this.$(this.element).find('a').on('click', () => {
      this.$(this.element).find('a').tooltip('hide');
    });
  }
});
