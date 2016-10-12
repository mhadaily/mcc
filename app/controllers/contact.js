import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['refcon', 'backTo', 'step', 'taskrf', 'contactrf', "sort", "sortDir", "query"],
  step: null,
  refcon: null,
  isSync: false,
  backTo: null,
  blink: null,
  noteContent: null,
  blockHeight: Ember.computed('blockHeight', function () {
    let wheight = parseInt(window.innerHeight - 190, 10);
    // Fix heights on window resize
    let iv = null;
    Ember.$(window).resize(function () {
      if (iv !== null) {
        window.clearTimeout(iv);
      }
      // Needs to be a timeout function so it doesn't fire every ms of resize
      iv = setTimeout(function () {
        Ember.$('.content-block-tab').height(window.innerHeight - 190);
      }, 20);
    });
    return wheight;
  }),
  blockHeightNote: Ember.computed('blockHeightNote', function () {
    let wheight = parseInt(window.innerHeight - 230, 10);
    // Fix heights on window resize
    let iv = null;
    Ember.$(window).resize(function () {
      if (iv !== null) {
        window.clearTimeout(iv);
      }
      // Needs to be a timeout function so it doesn't fire every ms of resize
      iv = setTimeout(function () {
        Ember.$('.content-block').height(window.innerHeight - 230);
      }, 20);
    });
    return wheight;
  }),
  contact: Ember.computed('model', function () {
    return this.get('model');
  }),
  tasks: Ember.computed('model.tasks.[]', 'model.tasks.@each.date', function () {
    return this.get('model.tasks').sortBy('dateDue').reverse();
  }),
  salesOrders: Ember.computed('model.salesOrders.[]', 'model.salesOrders.@each.date', function () {
    return this.get('model.salesOrders').sortBy('date').reverse();
  }),
  notes: Ember.computed('model.notes.[]', 'model.notes.@each.date', function () {
    return this.get('model.notes').sortBy('date').reverse();
  }),
  notes_and_task_notes_union: Ember.computed.union('contact.taskNotes.[]', 'contact.notes.[]'),
  notes_and_task_notes: Ember.computed('notes_and_task_notes_union.@each.date', function () {
    return this.get('notes_and_task_notes_union').sortBy('date').reverse();
  }),
  query: '',
  sort: '',
  sortDir: 'asc',
  actions: {
    taskChangeColor: function () {
      this.set('blink', 'blinker');
      // remove blinker after 1 sec, it must be passed to reference for 'this' so easily we can bind that.
      setTimeout(function () {
        this.set('blink', ' ');
      }.bind(this), 1000);
    }
  }
});
