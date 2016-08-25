import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "step", "home_phone", "time_zone", "query", "page", "perPage", "sort", "sortDir"],
  contact: null,
  step: null,
  home_phone: null,
  time_zone: null,
  query: '',
  page: 1,
  sortBy: ['name:asc'],
  contacts: Ember.computed.sort('model', 'sortBy')
});
