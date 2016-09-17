import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'modal-content',
  queryParams: ['taskrf'],
  store: Ember.inject.service(),
  taskrf: null,
  task: Ember.computed('taskrf', function() {
    return this.get('store').peekRecord('task', this.get('taskrf'));
  }),
  actions: {
    cancel() {
      this.sendAction('dismiss');
    },
    update(dateDue) {
      this.sendAction('dateSave', dateDue);
      this.sendAction('dismiss');
    }
  }
});
