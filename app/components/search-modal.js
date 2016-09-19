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
      let email = this.get('contact')
      console.log(email);
      /* TODO - PASS TO CONTACTS ROUTE */
    }
  }
});
