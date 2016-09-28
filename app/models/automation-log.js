import DS from 'ember-data';

export default DS.Model.extend({
  contact:   DS.belongsTo(),
  reference: DS.attr(),
  what:      DS.attr(),
  date:      DS.attr()
});
