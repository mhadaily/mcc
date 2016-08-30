import Ember from 'ember';

const SortLinkComponent = Ember.LinkComponent.extend({
  tagName: 'th',
  classNameBindings: ['header', 'isAsc:headerSortUp:headerSortDown'],
  name: null,
  sort: null,
  sortDir: 'desc',
  isAsc: Ember.computed('sortDir', function() {
    return this.sortDir === 'asc';
  })
});

// SortLinkComponent.reopenClass({
//   positionalParams: ['name', 'sort', 'sortDir']
// });

export default SortLinkComponent;
