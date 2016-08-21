import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "step", "l1_mttb_coach", "l2_mttb_coach", "query", "page", "perPage"],
  contact: null,
  step: null,
  l1_mttb_coach: null,
  l2_mttb_coach: null,
  query: '',
  page: 1,
  perPage: 25,
  sortBy: ['name:asc'],
  contacts: Ember.computed.sort('model', 'sortBy')
});
