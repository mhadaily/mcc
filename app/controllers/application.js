import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  queryParams: ['library', 'search'],
  library: null,
  search: null,
  actions: {
    queryChanged() {
      this.transitionToRoute('contacts');
    }
  }
});
