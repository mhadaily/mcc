import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['backTo', 'step', 'taskStatus'],
  step: null,
  taskStatus: null,
  backTo: null,
  contact: Ember.computed('model.contact',function() {
    return this.get('model.contact');
  }),
  tasks: Ember.computed('contact.tasks.[]','contact.tasks.@each.date',function() {
    return this.model.get('contact.tasks').sortBy('dateDue').reverse();
  }),
  salesOrders: Ember.computed('contact.salesOrders.[]','contact.salesOrders.@each.date',function() {
    return this.model.get('contact.salesOrders').sortBy('date').reverse();
  }),
  notes: Ember.computed('contact.notes.[]','contact.notes.@each.date',function() {
    return this.model.get('contact.notes').sortBy('date').reverse();
  })
});
