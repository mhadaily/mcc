import DS from 'ember-data';

export default DS.Model.extend({
  reference: DS.attr(),
  note: DS.attr(),
  date: DS.attr()
});
