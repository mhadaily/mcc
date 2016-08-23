import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "subject", "date_due_gteq", "date_due_lteq", "query", "sort", "sortDir"],
  contact: null,
  subject: null,
  date_due_gteq: null,
  date_due_lteq: null,
  query: '',
  sort: '',
  sortDir: 'asc',
  sortBy: ['dateDue:desc'],
  tasks: Ember.computed.sort('model', 'sortBy')
});
