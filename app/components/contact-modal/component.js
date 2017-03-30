import Ember from 'ember';
import oapStates from '../../utils/oapstates';
import oapCountries from '../../utils/oapcountries';

export default Ember.Component.extend({
  classNames: 'modal-content',
  contact: null,
  oapStates,
  oapCountries
});
