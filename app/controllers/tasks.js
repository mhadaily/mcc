import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  statuses: [
    'all status', 'pending', 'completed', 'cancelled'
  ],
  queryParams: ["contact", 'offset_from', 'offset_to', "contact_step_number", "contact_time_zone", "subject", "date_due_gteq", "date_due_lteq", "status_eq", "user_name", "query", "page", "perPage", "sort", "sortDir"],
  taskOwners: [
    'my calls', 'all calls'
  ],
  offset_from: null,
  offset_to: null,
  perPageList: [10, 25, 50, 100],
  utcHour: Ember.computed(function () {
    let i = 1;
    let now = moment().utc().hour();
    let arr = [];
    for (i; i <= 24; i++) {
      arr.push({id: (i - now) * 60 * 60, label: i});
    }
    let j = -24;
    for (j; j <= -12; j++) {
      let m = j + 24;
      arr.unshift({id: -(m + now) * 60 * 60, label: j});
    }
    arr.unshift({id: 'N/A', label: 'N/A'});
    return arr;
  }),
  contact: null,
  // contact_step: null,
  contact_step_number: null,
  contact_time_zone: null,
  subject: null,
  date_due_gteq: null,
  startDateToJSDate: Ember.computed('date_due_gteq', {
    get(/* key */) {
      return this.get('date_due_gteq') ? moment(this.get('date_due_gteq')).toDate() : null;
    },
    set(key, value) {
      this.set('date_due_gteq', value ? moment(value).format('YYYY-MM-DD') : '');
      return value;
    }
  }),
  date_due_lteq: null,
  endDateToJSDate: Ember.computed('date_due_lteq', {
    get(/* key */) {
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
    sendPerPage(selection){
      this.send('changePerPage', selection);
    },
    queryClear() {
      this.set('contact', null);
      // this.set('contact_step', null);
      this.set('contact_step_number', null);
      this.set('contact_time_zone', null);
      this.set('date_due_gteq', null);
      this.set('date_due_lteq', null);
      this.set('subject', null);
      this.set('status_eq', 'pending');
      this.set('user_name', 'my calls');
      this.set('offset_from', null);
      this.set('offset_to', null);
      this.send("queryChanged");
    },
    selectuUtc(propertyName, selection) {
      if (selection === 'N/A') {
        this.set(propertyName, null);
      } else {
        this.set(propertyName, selection);
      }
    }
  }
});
