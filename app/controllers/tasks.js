import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  statuses: [
    'pending', 'completed', 'cancelled'
  ],
  queryParams: ["contact", "contact_step", "subject", "date_due_gteq", "date_due_lteq", "status_eq", "query", "page", "perPage", "sort", "sortDir"],
  contact: null,
  contact_step: null,
  subject: null,
  date_due_gteq: null,
  startDateToJSDate: Ember.computed('date_due_gteq', {
    get(key) {
      return this.get('date_due_gteq') ? moment(this.get('date_due_gteq')).toDate() : null;
    },
    set(key, value) {
      this.set('date_due_gteq', value ? moment(value).format('YYYY-MM-DD') : '');
      return value;
    }
  }),
  date_due_lteq: null,
  endDateToJSDate: Ember.computed('date_due_lteq', {
    get(key) {
      return this.get('date_due_lteq') ? moment(this.get('date_due_lteq')).toDate() : null;
    },
    set(key, value) {
      this.set('date_due_lteq', value ? moment(value).format('YYYY-MM-DD') : '');
      return value;
    }
  }),
  status_eq: 'pending',
  query: '',
  sort: '',
  sortDir: 'asc'
});
