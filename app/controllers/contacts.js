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
  actions: {
    selectuUtcFrom(selection) {
      selection === 'N/A' ? this.set('offset_from', null) : this.set('offset_from', selection)
    },
    selectuUtcTo(selection) {
      selection === 'N/A' ? this.set('offset_to', null) : this.set('offset_to', selection)
    }
  }
});
