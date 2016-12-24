import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'modal-content',
  contact: null,
  didInsertElement(){
    const country = this.get('contact.country');
    const state = this.get('contact.state');
    Ember.$('#billing_country > option').map(function(index,option) {
      if (option.value === country || option.text === country) {
        Ember.$(this).prop('selected', true);
      }
    });
    Ember.$('#billing_state > option').map(function(index,option) {
      if (option.value === state || option.text === state) {
        Ember.$(this).prop('selected', true);
      }
    });
  },
});
