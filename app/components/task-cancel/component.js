import Ember from 'ember';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  classNames: ['task-cancel'],
  actions: {
    dismiss: function() {
      this.sendAction('dismiss');
    },
    cancel: function(noteContentModal) {
      this.get('task').set('statusEvent', 'cancel');
      this.get('task').set('note', noteContentModal);

      this.get('task').save().then(d => {

        this.get('notify').success('Task has been cancelled with following note :' + noteContentModal + '!');
        this.set('noteContentModal', ' ');
        this.sendAction('dismiss');
        return d;
      }).catch(e => {
        this.get('notify').error(e.message);
        return e;
      });
    }
  }
});
