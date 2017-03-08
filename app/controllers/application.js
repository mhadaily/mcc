import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  queryParams: ['library', 'search'],
  library: null,
  search: false,
  actions: {
    searchNow(...fields) {
      let contact, step, home_phone, cell_phone, skype_id, country_or_state;
      let trimmedFields = fields.map(item => Ember.$.trim(item));

      [contact, step, home_phone, cell_phone, skype_id, country_or_state] = trimmedFields;

      this.transitionToRoute('contacts', {
        queryParams: {
          contact,
          step,
          country_or_state,
          home_phone,
          cell_phone,
          skype_id,
          time_zone: country_or_state
        }
      });
      this.set('search', false);
    }
  }
});
