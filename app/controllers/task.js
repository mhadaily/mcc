import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['backTo', 'step', 'taskStatus'],
  step: null,
  taskStatus: null,
  backTo: null,
  contact: Ember.computed('model.contact',function() {
    return this.get('model.contact');
  }),
  notes: Ember.computed('model.contact.notes.[]','model.contact.notes.@each.date',function() {
    return this.model.get('contact.notes').sortBy('date').reverse();
  })
});
