// import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  email: DS.attr(),
  team: DS.attr(),
  phone: DS.attr(),
  skypeId: DS.attr(),
  country: DS.attr(),
  timeZone: DS.attr(),
  calendar: DS.attr(),
  role: DS.attr(),
  status: DS.attr(),
});
