import Ember from 'ember';

export default Ember.Controller.extend({
  statuses: [
    'pending', 'completed', 'cancelled'
  ],
  queryParams: ["contact", "contact_step", "subject", "date_due_gteq", "date_due_lteq", "status_eq", "query", "page", "perPage", "sort", "sortDir"],
  contact: null,
  contact_step: null,
  subject: null,
  date_due_gteq: null,
  date_due_lteq: null,
  status_eq: 'pending',
  query: '',
  sort: '',
  sortDir: 'asc'
});
