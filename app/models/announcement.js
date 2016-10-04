import DS from 'ember-data';

export default DS.Model.extend({
  subject: DS.attr(),
  summary: DS.attr(),
  body: DS.attr(),
  published_at: DS.attr()
});
