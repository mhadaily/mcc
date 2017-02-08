import Ember from 'ember';
import countries from '../utils/countries';

export default Ember.Controller.extend({

  countries,

  actions:{
    selectCountry(selection){
      console.log(selection);
    },
  }

});
