import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'sync-modal',
  queryParams: ['refcon'],
  store: Ember.inject.service(),
  refcon: null,
  contact: Ember.computed('refcon', function () {
    return this.get('store').peekRecord('contact', this.get('refcon'));
  }),
  actions: {
    cancel() {
      this.sendAction('dismiss');
    },
    update(id) {
      this.sendAction('syncContact', id);
      this.sendAction('dismiss');
    }
  }
});
