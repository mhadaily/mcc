import Ember from 'ember';

export default Ember.Controller.extend({
  // queryParams: [
  //   'page',
  // ],
  // page: 1,
  //
  // actions: {
  //   nextPage() {
  //     let page = this.get('page');
  //     this.set('page', page + 1);
  //   },
  //   prevPage() {
  //     let page = this.get('page');
  //     this.set('page', page - 1);
  //   }
  // },
  queryParams: {
    contact: {
      refreshModel: true
    },
    subject: {
      refreshModel: true
    },
    step: {
      refreshModel: true
    }
  },
  contact: null,
  subject: null,
  step: null,
  date_due_from: null,
  sortBy: ['dateDue:desc'],
  tasks: Ember.computed.sort('model', 'sortBy')
});
