import DS from 'ember-data';

export default DS.Model.extend({
  subject: DS.attr(),
  reference: DS.attr(),
  outcomes: DS.attr()
});
