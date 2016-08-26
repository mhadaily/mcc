import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['backTo', 'step'],
  step: null,
  backTo: null,
  contact: Ember.computed('model',function() {
    return this.get('model');
  }),
  tasks: Ember.computed('model.tasks.[]','model.tasks.@each.date',function() {
    return this.get('model.tasks').sortBy('dateDue').reverse();
  }),
  salesOrders: Ember.computed('model.salesOrders.[]','model.salesOrders.@each.date',function() {
    return this.get('model.salesOrders').sortBy('date').reverse();
  }),
  notes: Ember.computed('model.notes.[]','model.notes.@each.date',function() {
    return this.model.get('notes').sortBy('date').reverse();
  })
});
