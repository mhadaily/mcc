import Ember from 'ember';
import oapStates from '../../utils/oapstates';
import oapCountries from '../../utils/oapcountries';

export default Ember.Component.extend({
  classNames: 'modal-content',
  contact: null,
  oapStates,
  oapCountries,
  actions: {
    mapState(){
      const stateCode = this.get('contact.stateCode');
      // this.childViews[10].selection = stateCode;
    },
    mapCountry(){
      const countryCode = this.get('contact.countryCode');
      // this.childViews[11].selection = countryCode;
    },
  }
});
