import Ember from 'ember';

export default Ember.Controller.extend({
  dueTodayTasks: Ember.computed('model.tasks.[]', function() {
    return this.get('model.tasks');
  })
});
