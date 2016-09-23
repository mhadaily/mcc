import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  statuses: [
    'all status', 'pending', 'completed', 'cancelled'
  ],
  queryParams: ["contact", 'offset_from', 'offset_to', "contact_step", "contact_time_zone", "subject", "date_due_gteq", "date_due_lteq", "status_eq", "user_name", "query", "page", "perPage", "sort", "sortDir"],
  taskOwners: [
    'my calls', 'all calls'
  ],
  offset_from: null,
  offset_to: null,
  utcHour: Ember.computed(function() {
    let i = 0;
    let now = moment().utc().hour();
    let arr = [{ id: 'N/A', label: 'N/A' }];
    for (i; i <= 24; i++) {
      arr.push({ id: (i - now) * 60 * 60, label: i });
    }
    return arr;
  }),
  contact: null,
  contact_step: null,
  contact_time_zone: null,
  subject: null,
  date_due_gteq: null,
  startDateToJSDate: Ember.computed('date_due_gteq', {
    get( /* key */ ) {
      return this.get('date_due_gteq') ? moment(this.get('date_due_gteq')).toDate() : null;
    },
    set(key, value) {
      this.set('date_due_gteq', value ? moment(value).format('YYYY-MM-DD') : '');
      return value;
    }
  }),
  date_due_lteq: null,
  endDateToJSDate: Ember.computed('date_due_lteq', {
    get( /* key */ ) {
      return this.get('date_due_lteq') ? moment(this.get('date_due_lteq')).toDate() : null;
    },
    set(key, value) {
      this.set('date_due_lteq', value ? moment(value).format('YYYY-MM-DD') : '');
      return value;
    }
  }),
  status_eq: 'pending',
  user_name: 'my calls',
  query: '',
  sort: '',
  sortDir: 'asc',
  actions: {
    queryClear() {
      this.set('contact', '');
      this.set('contact_step', '');
      this.set('contact_time_zone', '');
      this.set('date_due_gteq', '');
      this.set('date_due_lteq', '');
      this.set('subject', '')
      this.set('status_eq', 'pending');
      this.set('user_name', 'my calls');
      this.set('offset_from', null);
      this.set('offset_to', null);
    },
    selectuUtcFrom(selection) {
      selection === 'N/A' ? this.set('offset_from', null) : this.set('offset_from', selection)
    },
    selectuUtcTo(selection) {
      selection === 'N/A' ? this.set('offset_to', null) : this.set('offset_to', selection)
    }
  }
});
