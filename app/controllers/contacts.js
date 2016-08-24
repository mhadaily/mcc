import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "step", "l1_mttb_coach", "l2_mttb_coach", "query", "page", "perPage", "sort", "sortDir"],
  contact: null,
  step: null,
  l1_mttb_coach: null,
  l2_mttb_coach: null,
  query: '',
  sort: '',
  sortDir: 'asc'
});
