import Ember from 'ember';
import countries from '../utils/countries';
import timezones from '../utils/timezones';

export default Ember.Controller.extend({
  timezones,
  countries,

  actions: {
    selectCountry(selection){
      console.log(selection);
    },
    selectTimezone(selection){
      console.log(selection);
    },
    savePassword(){
      console.warn('Will be completed Soon');
    },
    saveProfile(){

    },
  }

});
