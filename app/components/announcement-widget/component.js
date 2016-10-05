import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  channel: null,
  announceList: Ember.computed(function () {
    let chanel = this.get('chanel');
    return this.get('store').query('announcement', {q: {chanel_eq: chanel}, per_page: 3});
  }),
  title: null,
  actions: {
    pageRefresh() {
      location.reload();
    }
  }

});
