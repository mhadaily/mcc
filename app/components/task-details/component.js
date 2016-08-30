import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['task-details-modal'],
  queryParams: ['taskrf'],
  store: Ember.inject.service(),
  taskrf: null,
  blink: null,
  task: Ember.computed('taskrf', function() {
    return this.get('store').peekRecord('task', this.get('taskrf'));
  }),
  actions: {
    dimiss: function() {
      this.sendAction('dismiss');
    },
    taskChangeColor: function() {
      this.sendAction('taskChangeColor');
      this.sendAction('dismiss');
    }

  }
});
