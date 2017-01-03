import DS from 'ember-data';

export default DS.Model.extend({
  contact: DS.belongsTo(),
  user: DS.belongsTo(),
  task: DS.belongsTo(),
  reference: DS.attr(),
  note: DS.attr(),
  date: DS.attr(),
  status: DS.attr()
});
