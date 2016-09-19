import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  queryParams: ['library', 'search'],
  library: null,
  search: null,
  actions: {
    queryChanged(contact, step, country_or_state, home_phone, skype_id, time_zone) {

      this.transitionToRoute('contacts', {
        queryParams: {
          contact: contact,
          step: step,
          country_or_state: country_or_state,
          home_phone: home_phone,
          skype_id: skype_id,
          time_zone: time_zone
        }
      });
    }
  }
});
