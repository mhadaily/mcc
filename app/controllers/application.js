import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  queryParams: ['fakeNumber', 'searchShow'],
  fakeNumber: null,
  searchSHow: null,
  actions: {
    queryChanged() {
      this.transitionToRoute('contacts');
    }
  }
});
