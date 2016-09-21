import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['search-modal'],
  actions: {
    dismiss() {
      this.sendAction('dismiss');
    },
    searchNow() {

      let contact = Ember.$.trim(this.get('contact'));
      let step = Ember.$.trim(this.get('step'));
      let country_or_state = Ember.$.trim(this.get('country_or_state'));
      let home_phone = Ember.$.trim(this.get('home_phone'));
      let cell_phone = Ember.$.trim(this.get('cell_phone'));
      let skype_id = Ember.$.trim(this.get('skype_id'));
      let time_zone = Ember.$.trim(this.get('time_zone'));

      this.sendAction('dismiss');
      this.sendAction('queryChanged', contact, step, country_or_state, home_phone, cell_phone, skype_id, time_zone);
    }
  }
});
