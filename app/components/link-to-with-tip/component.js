import Ember from 'ember';

export default Ember.LinkComponent.extend({
  didInsertElement() {
    this._super(...arguments)
    $(this.element).find('a').tooltip();
    $(this.element).find('a').on('click',() => {
      $(this.element).find('a').tooltip('hide')
    })
  }
});
