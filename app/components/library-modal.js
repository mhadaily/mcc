import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['library-modal'],
  actions: {
    dismiss: function() {
      this.sendAction('dismiss');
    }
  }
});
