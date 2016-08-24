import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "step", "home_phone", "time_zone", "query", "page", "perPage", "sort", "sortDir"],
  contact: null,
  step: null,
  home_phone: null,
  time_zone: null,
  query: '',
  sort: '',
  sortDir: 'asc'
});
