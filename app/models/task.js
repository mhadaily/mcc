// import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contact: DS.belongsTo(),
  details: DS.attr(),
  reference: DS.attr(),
  source: DS.attr(),
  subject: DS.attr(),
  stepNum: DS.attr(),
  dateAssigned: DS.attr('date'),
  dateDue: DS.attr('date'),
  dateComplete: DS.attr('date')
});
