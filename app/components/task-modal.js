import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['task-modal'],
  actions: {
    dismiss: function() {
      this.sendAction('dismiss');
    },
    complete: function() {
      this.sendAction('complete');
    }
  }
});
