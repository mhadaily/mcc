import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['task-modal'],
  actions: {
    dismiss: function() {
      this.sendAction('dismiss');
    },
    complete: function() {
      // this.sendAction('taskComplete');
      alert('there is no logic for now!!!');
    },
    cancel: function() {
      // this.sendAction('taskCancel');
      //
      alert('there is no logic for now!!!');
    }
  }
});
