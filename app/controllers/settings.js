import Ember from 'ember';
import countries from '../utils/countries';
import timezones from '../utils/timezones';

const passwordFields = Ember.Object.extend({
  password: '',
  passwordConfirmation: ''
});

export default Ember.Controller.extend({
  timezones,
  countries,
  passwordFields: passwordFields.create({
    password: '',
    passwordConfirmation: ''
  }),
});
