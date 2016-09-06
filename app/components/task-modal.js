import Ember from 'ember';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  store: Ember.inject.service(),
  classNames: ['task-modal'],
  ref: null,
  outcomeList: Ember.computed('ref', function() {
    return this.get('store').peekRecord('task', this.get('ref'));
  }),
  selectedOutcome: null,
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
      let content = this.get('task.taskType.outcomes');
      let _selection = content[selectedIndex - 1];
      this.set('selectedOutcome', _selection);

    },
    complete: function(noteContentModal, selectedOutcome) {
      this.get('task').set('statusEvent', 'complete');
      this.get('task').set('outcome', selectedOutcome);
      this.get('task').set('note', noteContentModal);

      this.get('task').save().then(d => {

        this.get('notify').success('Task has been completed with following note :' + noteContentModal + ' and outcome is ' + selectedOutcome);
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
