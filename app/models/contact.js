import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  notes: DS.hasMany(),
  sales-orders: DS.hasMany(),
  tasks: DS.hasMany(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  reference: DS.attr(),
  source: DS.attr(),
  email: DS.attr(),
  homePhone: DS.attr(),
  reference: DS.attr(),
  state: DS.attr()
});
