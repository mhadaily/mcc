import Ember from 'ember';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  classNames: ['task-modal'],
  actions: {
    dismiss: function() {
      this.sendAction('dismiss');
    },
    taskComplete: function() {

      alert('there is no logic for now!!!');
    },
    complete: function(noteContentModal) {
      this.currentModel.set('statusEvent', 'complete');
      this.currentModel.save().then(d => {
        this.get('notify').success('there is no logic for now!!! but this is yout note:' + noteContentModal);
        this.set('noteContentModal', ' ');
        this.sendAction('dismiss');
        return d;
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
