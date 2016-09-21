import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  statuses: [
    'all status', 'pending', 'completed', 'cancelled'
  ],
  queryParams: ["contact", 'offsetFromSec', 'offsetToSec', "contact_step", "contact_time_zone", "subject", "date_due_gteq", "date_due_lteq", "status_eq", "user_name", "query", "page", "perPage", "sort", "sortDir"],
  taskOwners: [
    'my calls', 'all calls'
  ],
  offsetFromSec: null,
  utcHourFromAction: Ember.computed('offsetFromSec', {
    get( /* key */ ) {
      return this.get('offsetFromSec') ? Ember.$.trim(this.get('offsetFromSec')) : null;
    },
    set(key, value) {
      let now = moment().utc().hour();
      let diff = (value - now) * 60 * 60;
      this.set('offsetFromSec', value ? diff : '');
      return value;
    }
  }),
  offsetToSec: null,
  utcHourToAction: Ember.computed('offsetToSec', {
    get( /* key */ ) {
      return this.get('offsetToSec') ? Ember.$.trim(this.get('offsetToSec')) : null;
    },
    set(key, value) {
      let now = moment().utc().hour();
      let diff = (value - now) * 60 * 60;
      this.set('offsetToSec', value ? diff : '');
      return value;
    }
  }),
  utcHour: Ember.computed(function() {
    let i = 0;
    let arr = [];
    for (i; i <= 24; i++) {
      arr.push(i);
    }
    return arr;
  }),
  contact: null,
  contactTrim: Ember.computed('contact', {
    get( /* key */ ) {
      return this.get('contact') ? Ember.$.trim(this.get('contact')) : null;
    },
    set(key, value) {
      this.set('contact', value ? Ember.$.trim(value) : '');
      return value;
    }
  }),
  contact_step: null,
  contact_stepTrim: Ember.computed('contact_step', {
    get( /* key */ ) {
      return this.get('contact_step') ? Ember.$.trim(this.get('contact_step')) : null;
    },
    set(key, value) {
      this.set('contact_step', value ? Ember.$.trim(value) : '');
      return value;
    }
  }),
  contact_time_zone: null,
  contact_time_zoneTrim: Ember.computed('contact_time_zone', {
    get( /* key */ ) {
      return this.get('contact_time_zone') ? Ember.$.trim(this.get('contact_time_zone')) : null;
    },
    set(key, value) {
      this.set('contact_time_zone', value ? Ember.$.trim(value) : '');
      return value;
    }
  }),
  subject: null,
  subjectTrim: Ember.computed('subject', {
    get( /* key */ ) {
      return this.get('subject') ? Ember.$.trim(this.get('subject')) : null;
    },
    set(key, value) {
      this.set('subject', value ? Ember.$.trim(value) : '');
      return value;
    }
  }),
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
