import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['backTo', 'step'],
  step: null,
  backTo: null,
  notes: Ember.computed('model.notes.[]','model.notes.@each.date',function() {
    return this.model.get('notes').sortBy('date').reverse();
  })
});
