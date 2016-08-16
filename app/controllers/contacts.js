import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "step", "query", "page", "perPage"],
  contact: null,
  step: null,
  query: '',
  page: 1,
  perPage: 25,
  sortBy: ['name:asc'],
  contacts: Ember.computed.sort('model', 'sortBy')
});
