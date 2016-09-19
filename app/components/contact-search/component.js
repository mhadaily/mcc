import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'search-contact',
  queryParams: ['searchContact'],
  searchContact: null,
  actions: {
    cancel() {
      this.sendAction('dismiss');
    },
    queryChanged() {


    }
  }
});
