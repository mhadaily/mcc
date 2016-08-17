import Ember from 'ember';

export default Ember.Controller.extend({
  dueTodayTasks: Ember.computed('model.tasks.[]', function() {
    return this.get('model.tasks');
  }),
  overdueTasks: Ember.computed('model.tasks.[]', function() {
    return this.get('model.tasks');
  }),
  futureTasks: Ember.computed('model.tasks.[]', function() {
    return this.get('model.tasks');
  }),
  steps: Ember.computed('summary.steps', function() {
    var steps = {};
    for (var i = 1; i <= 21; i++) {
      return steps;
    }
  })
});
