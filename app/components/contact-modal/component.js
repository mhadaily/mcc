import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'modal-content',
  queryParams: ['contactrf'],
  store: Ember.inject.service(),
  contactrf: null,
  contact: Ember.computed('contactrf', function() {
    return this.get('store').peekRecord('contact', this.get('contactrf'));
  }),
  actions: {
    cancel() {
      this.sendAction('dismiss');
    },
    create() {
      this.sendAction('update');
    }
  }
});
