import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "subject", "date_due_gteq", "date_due_lteq", "step", "query", "page", "perPage"],
  contact: null,
  subject: null,
  date_due_gteq: null,
  date_due_lteq: null,
  date: null,
  step: null,
  query: '',
  page: 1,
  perPage: 25,
  sortBy: ['dateDue:desc'],
  tasks: Ember.computed.sort('model', 'sortBy')
});
