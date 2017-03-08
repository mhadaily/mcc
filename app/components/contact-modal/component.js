import Ember from 'ember';
import oapStates from '../../utils/oapstates';
import oapCountries from '../../utils/oapcountries';

export default Ember.Component.extend({
  classNames: 'modal-content',
  contact: null,
  state: null,
  country: null,
  oapStates,
  oapCountries,
  didInsertElement(){
    this.set('state',this.get('contact.stateCode'));
    this.set('country',this.get('contact.countryCode'));
  }
});
