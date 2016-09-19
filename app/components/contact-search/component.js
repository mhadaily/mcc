import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['searchc-modal'],
  actions: {
    dismiss() {
      this.sendAction('dismiss');
    },
    queryChanged() {

    }
  }
});
