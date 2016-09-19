import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['search-modal'],
  queryParams: ["contact", "step", "home_phone", "skype_id", "time_zone", "country_or_state"],
  contact: '',
  step: '',
  home_phone: '',
  skype_id: '',
  time_zone: '',
  country_or_state: '',
  actions: {
    dismiss() {
      this.sendAction('dismiss');
    },
    searchNow() {
      this.sendAction('dismiss');
      this.sendAction('queryChanged');
    }
  }
});
