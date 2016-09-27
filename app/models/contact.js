import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  notes: DS.hasMany(),
  salesOrders: DS.hasMany(),
  tasks: DS.hasMany(),
  date: DS.attr(),
  dateLastModified: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  name: DS.attr(),
  reference: DS.attr(),
  source: DS.attr(),
  email: DS.attr(),
  homePhone: DS.attr(),
  cellPhone: DS.attr(),
  step: DS.attr(),
  l1MttbCoach: DS.attr(),
  l2MttbCoach: DS.attr(),
  timeZone: DS.attr(),
  utcOffset: DS.attr(),
  city: DS.attr(),
  state: DS.attr(),
  country: DS.attr(),
  skypeId: DS.attr(),
  tags: DS.attr(),
  spent: DS.attr(),
  mttbApplication: DS.attr(),
  mttbInterview: DS.attr(),
  agreementTags: Ember.computed('tags', function() {
    var tags = this.get('tags'),
      result = {};
    for (var k in tags) {
      if (tags[k].match(/agreement/i)) { result[k] = tags[k]; }
    }
    return result;
  })
});
