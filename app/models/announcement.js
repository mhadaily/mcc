import DS from 'ember-data';

export default DS.Model.extend({
  channel: DS.attr(),
  subject: DS.attr(),
  summary: DS.attr(),
  body: DS.attr(),
  publish_at: DS.attr('Date')
});
