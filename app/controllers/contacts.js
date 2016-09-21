import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "step", "home_phone", "cell_phone", "skype_id", "time_zone", "country_or_state", "query", "page", "perPage", "sort", "sortDir"],
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
  contacts: Ember.computed.sort('model', 'sortBy')
});
