import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  contact: computed('model', function() {
    return this.get('model');
  }),
  tasks: computed('model.tasks.[]', 'model.tasks.@each.date', function() {
    return this.get('model.tasks').sortBy('dateDue').reverse();
  }),
  taskDetail: computed('taskrf', function() {
    let taskrf = this.get('taskrf');
    if (taskrf) {
      return this.get('store').peekRecord('task', taskrf);
    }
  }),
  taskDetailReschedule: computed('taskref', function() {
    let taskref = this.get('taskref');
    if (taskref) {
      return this.get('store').peekRecord('task', taskref);
    }
  }),
  actions: {
    clone(reference) {
      this.send('duplicateTask', reference);
    },
    changeStep(stepNumber) {
      this.send('changeSave', Number(stepNumber));
      this.set('step', null);
    },
    updateRescheduleTask(dateDue, taskRef) {
      this.send('dateSave', dateDue, taskRef);
      this.set('taskref', null);
    },
    taskChangeColor() {
      this.set('blink', 'blinker');
      setTimeout(function () {
        this.set('blink', ' ');
      }.bind(this), 1000);
      this.set('taskrf', null);
    },
    populateModal(task) {
      if (task.data.status !== 'pending') {
        this.get('notify').info(`${task.data.status} Task cannot be rescheduled again.`);
        return;
      }
      this.set('taskref', task.id);
    },
    populateModalDetails(task) {
      this.set('taskrf', task.id);
    },
  }
  
});
