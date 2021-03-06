// import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contact: DS.belongsTo(),
  user: DS.belongsTo(),
  reference: DS.attr(),
  source: DS.attr(),
  date: DS.attr(),
  content: DS.attr(),
  status: DS.attr()
});
