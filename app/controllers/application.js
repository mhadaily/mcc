import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  queryParams: ['library', 'search'],
  library: null,
  search: null,
  actions: {
    searchNow() {
      var trimMe = function(str) {
        return Ember.$.trim(str);
      };
      let contact = trimMe(this.get('contact'));
      let step = trimMe(this.get('step'));
      let country_or_state = trimMe(this.get('country_or_state'));
      let home_phone = trimMe(this.get('home_phone'));
      let cell_phone = trimMe(this.get('cell_phone'));
      let skype_id = trimMe(this.get('skype_id'));
      let time_zone = trimMe(this.get('time_zone'));

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
    }

  }
})
