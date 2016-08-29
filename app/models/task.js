import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contact: DS.belongsTo(),
  taskType: DS.belongsTo(),
  outcomeType: DS.belongsTo(),
  status: DS.attr(),
  statusEvent: DS.attr(),
  details: DS.attr(),
  reference: DS.attr(),
  source: DS.attr(),
  subject: DS.attr(),
  outcome: DS.attr(),
  taskFinalNote: DS.attr(),
  stepNum: DS.attr(),
  dateAssigned: DS.attr('date'),
  dateDue: DS.attr('date'),
  dateComplete: DS.attr('date'),
  isOverdue: Ember.computed('dateDue',function() {
    return this.get('dateDue') < new Date();
  })
});
