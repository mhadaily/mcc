import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "step", "l1_mttb_coach", "l2_mttb_coach", "query", "page", "perPage", "sort", "sortDir"],
  contact: null,
  step: null,
  l1_mttb_coach: null,
  l2_mttb_coach: null,
  query: '',
  page: 1,
  sortBy: ['name:asc'],
  contacts: Ember.computed.sort('model', 'sortBy')
});
