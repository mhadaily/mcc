import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  queryParams: ["announce", "sort", "sortDir", "query"],
  announce: null,
  query: '',
  sort: '',
  sortDir: 'asc'
});
