import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  notes: DS.hasMany(),
  sales_orders: DS.hasMany(),
  tasks: DS.hasMany(),
  date: DS.attr('date'),
  dateLastModified: DS.attr('date'),
  firstName: DS.attr(),
  lastName: DS.attr(),
  reference: DS.attr(),
  source: DS.attr(),
  email: DS.attr(),
  homePhone: DS.attr(),
  reference: DS.attr(),
  state: DS.attr(),
  name: Ember.computed('firstName','lastName',function() {
    return [this.get('firstName'),this.get('lastName')].join(' ')
  })
});
