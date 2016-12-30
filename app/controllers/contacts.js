import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  queryParams: ["contact", "step_number", "offset_from", "offset_to", "home_phone", "cell_phone", "skype_id", "time_zone", "country_or_state", "query", "page", "perPage", "sort", "sortDir"],
  contact: '',
  // step: '',
  step_number: null,
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
  offset_to: null,
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
  actions: {
    queryClear() {
      this.set('contact', '');
      // this.set('step', '');
      this.set('step_number', null);
      this.set('home_phone', '');
      this.set('cell_phone', '');
      this.set('skype_id', '');
      this.set('time_zone', '');
      this.set('country_or_state', '');
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
