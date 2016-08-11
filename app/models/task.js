import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contact: DS.belongsTo(),
  reference: DS.attr(),
  source: DS.attr(),
  subject: DS.attr(),
  stepNum: DS.attr(),
  dateAssigned:DS.attr(),
  dateDue: DS.attr(),
  dateComplete: DS.attr()
});
