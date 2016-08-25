import Ember from 'ember';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  classNames: ['task-modal'],
  actions: {
    dismiss: function() {
      this.sendAction('dismiss');
    },
    complete: function(noteContentModal) {
      // this.sendAction('taskComplete');
      this.get('notify').success('there is no logic for now!!! but this is yout note:' + noteContentModal);
      this.set('noteContentModal', ' ');
      this.sendAction('dismiss');
    },
    cancel: function() {
      // this.sendAction('taskCancel');
      //
      this.get('notify').error('there is no logic for now!!!');
    }
  }
});
