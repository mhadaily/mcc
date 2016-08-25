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
  state: DS.attr(),
  step: DS.attr(),
  l1MttbCoach: DS.attr(),
  l2MttbCoach: DS.attr(),
  timeZone: DS.attr(),
  city: DS.attr(),
  state: DS.attr(),
  country: DS.attr(),
  content: 'row data will be replaced',
});
