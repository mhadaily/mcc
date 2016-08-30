import Ember from 'ember';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  classNames: ['task-modal'],
  task: null,

  init: function() {
    this._super(...arguments);
    if (!this.get('outcomeList')) {
      this.set('outcomeList', []);
    }
  },

  actions: {
    dismiss: function() {
      this.sendAction('dismiss');
    },
    selectOutcome: function() {
      let selectedIndex = this.$('select')[0].selectedIndex;
      let content = this.get('outcomeList');
      let _selection = content[selectedIndex];
      this.set('selectedOutcome', _selection);

    },
    complete: function(noteContentModal, selectedOutcome) {
      this.get('task').set('statusEvent', 'complete');
      this.get('task').set('outcome', selectedOutcome);
      this.get('task').set('taskFinalNote', noteContentModal);
      this.get('task').save().then(d => {

        this.get('notify').success('Task has been completed with following note :' + noteContentModal + ' and outcome is ' + selectedOutcome);
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
