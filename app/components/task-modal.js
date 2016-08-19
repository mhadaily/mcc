import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['task-modal'],
  actions: {
    cancel: function() {
      this.sendAction('cancel');
    },
    complete: function() {
      this.sendAction('complete');
    }
  }
});
