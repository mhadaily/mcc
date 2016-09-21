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
  utcHourFromAction: Ember.computed('offset_from', {
    get( /* key */ ) {
      return this.get('offset_from') ? Ember.$.trim(this.get('offset_from')) : ' ';
    },
    set(key, value) {
      let now = moment().utc().hour();
      let diff = (value - now) * 60 * 60;
      this.set('offset_from', value === 'N/A' ? null : diff);
      return value;
    }
  }),
  offset_to: null,
  utcHourToAction: Ember.computed('offset_to', {
    get( /* key */ ) {
      return this.get('offset_to') ? Ember.$.trim(this.get('offset_to')) : ' ';
    },
    set(key, value) {
      let now = moment().utc().hour();
      let diff = (value - now) * 60 * 60;
      this.set('offset_to', value === 'N/A' ? null : diff);
      return value;
    }
  }),
  utcHour: Ember.computed(function() {
    let i = 0;
    let arr = ['N/A'];
    for (i; i <= 24; i++) {
      arr.push(i);
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
  sortDir: 'asc'
});
