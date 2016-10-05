import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  channel: null,
  announceList: Ember.computed(function () {
    let chanel = this.get('channel');
    return this.get('store').query('announcement', {
      q: {channel_eq: chanel, s: 'publish_at desc'},
      page: 1,
      per_page: 1
    });
  }),
  actions: {
    pageRefresh() {
      location.reload();
    }
  }

});
