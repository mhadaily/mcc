import Ember from 'ember';
import countries from '../utils/countries';
import timezones from '../utils/timezones';

export default Ember.Controller.extend({
  timezones,
  countries,
});
