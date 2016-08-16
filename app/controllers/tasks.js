import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "subject", "step", "query", "page", "perPage"],
  contact: null,
  subject: null,
  step: null,
  query: '',
  page: 1,
  perPage: 25,
  sortBy: ['dateDue:desc'],
  tasks: Ember.computed.sort('model', 'sortBy')
});
