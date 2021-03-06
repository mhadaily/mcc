import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contact: DS.belongsTo(),
  user: DS.belongsTo(),
  taskType: DS.belongsTo(),
  outcomeType: DS.belongsTo(),
  taskNotes: DS.hasMany(),
  status: DS.attr(),
  statusEvent: DS.attr(),
  details: DS.attr(),
  reference: DS.attr(),
  source: DS.attr(),
  subject: DS.attr(),
  outcome: DS.attr(),
  note: DS.attr(),
  stepNum: DS.attr(),
  dateAssigned: DS.attr('date'),
  dateDue: DS.attr('date'),
  dateComplete: DS.attr('date'),
  isOverdue: Ember.computed('dateDue', function() {
    return this.get('dateDue') < new Date();
  }),
  isPending: Ember.computed('status', function() {
    return this.get('status') === 'pending';
  })
});
