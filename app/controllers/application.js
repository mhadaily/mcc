import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  queryParams: ['library', 'search'],
  library: null,
  search: false,
  actions: {
    searchNow(...args) {
      let contact = Ember.$.trim(args[0]);
      let step = Ember.$.trim(args[1]);
      let country_or_state = Ember.$.trim(args[2]);
      let home_phone = Ember.$.trim(args[3]);
      let cell_phone = Ember.$.trim(args[4]);
      let skype_id = Ember.$.trim(args[5]);
      let time_zone = Ember.$.trim(args[2]);
      this.transitionToRoute('contacts', {
        queryParams: {
          contact: contact,
          step: step,
          country_or_state: country_or_state,
          home_phone: home_phone,
          cell_phone: cell_phone,
          skype_id: skype_id,
          time_zone: time_zone
        }
      });
      this.set('search', false);
    }
  }
});
