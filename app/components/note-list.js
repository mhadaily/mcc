import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  notes: Ember.computed('notes', function() {
    return this.get('store').findAll('note');
  }),
  sortedNotes: Ember.computed.sort('notes', 'sortDefinition'),
  sortBy: 'date', // default sort by date
  reverseSort: false,
  sortDefinition: Ember.computed('sortBy', 'reverseSort', function() {
    let sortOrder = this.get('reverseSort') ? 'asc' : 'desc';
    return [`${this.get('sortBy')}:${sortOrder}`];
  }),
  actions: {
    sortButton() {
      let trueFalse = this.get('reverseSort') ? 'false' : 'true';
      if (trueFalse === 'true') {
        this.set('reverseSort', false);
      } else {
        this.set('reverseSort', true);
      }
    }
  }
});
