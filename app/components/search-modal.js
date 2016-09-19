import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['search-modal'],
  actions: {
    dismiss() {
      this.sendAction('dismiss');
    },
    queryChanged() {

    }
  }
});
