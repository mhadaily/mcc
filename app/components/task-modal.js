import Ember from 'ember';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  classNames: ['task-modal'],
  task: null,
  actions: {
    dismiss: function() {
      this.sendAction('dismiss');
    },
    complete: function(noteContentModal) {
      this.get('task').set('statusEvent', 'complete');
      this.get('task').save().then(d => {
        this.get('notify').success('there is no logic for now!!! but this is yout note:' + noteContentModal);
        this.set('noteContentModal', ' ');
        this.sendAction('dismiss');
        return d;
      }).catch(e => {
        this.get('notify').error('Already Completed');
        return e;
      });
    },
    cancel: function() {
      // this.currentModel.set('statusEvent', 'cancel');
      // this.currentModel.save().then(d => {
      //   alert('Task hasn been canceled');
      //   return d;
      // });
      //
      this.get('notify').error('there is no logic for now!!!');
    }
  }
});
