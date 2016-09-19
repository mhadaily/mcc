import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['searchc-modal'],
  actions: {
    cancel() {
      this.sendAction('dismiss');
    },
    queryChanged() {


    }
  }
});
