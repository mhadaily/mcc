import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contact: DS.belongsTo(),
  date: DS.attr(),
  amount: DS.attr(),
  source: DS.attr(),
  reference: DS.attr()
});
