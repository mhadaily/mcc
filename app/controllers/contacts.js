import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  queryParams: ["contact", "step", "offset_from", "offset_to", "home_phone", "cell_phone", "skype_id", "time_zone", "country_or_state", "query", "page", "perPage", "sort", "sortDir"],
  contact: '',
  step: '',
  home_phone: '',
  cell_phone: '',
  skype_id: '',
  time_zone: '',
  country_or_state: '',
  query: '',
  page: 1,
  sortBy: ['name:asc'],
  contacts: Ember.computed.sort('model', 'sortBy'),
  offset_from: null,
  utcHourFromAction: Ember.computed('offset_from', {
    get( /* key */ ) {
      return this.get('offset_from') ? Ember.$.trim(this.get('offset_from')) : 'N/A';
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
      return this.get('offset_to') ? Ember.$.trim(this.get('offset_to')) : 'N/A';
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
});
