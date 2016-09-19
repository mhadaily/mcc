import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  queryParams: ['fakeNumber', 'searchContact'],
  fakeNumber: null,
  searchContact: null,

});
