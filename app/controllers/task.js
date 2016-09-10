import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['backTo', 'step', 'ref', 'taskrf', 'refID'],
  step: null,
  ref: null,
  refID: null,
  backTo: null,
  blink: null,
  blockHeight: Ember.computed('blockHeight', function() {
    let wheight = parseInt(window.innerHeight - 255, 10);
    // Fix heights on window resize
    let iv = null;
    Ember.$(window).resize(function() {
      if(iv !== null) {
        window.clearTimeout(iv);
      }
      // Needs to be a timeout function so it doesn't fire every ms of resize
      iv = setTimeout(function() {
              Ember.$('.content-block').height(window.innerHeight - 250);
      }, 20);
    });
    return wheight;
  }),
  noteContent: null,
  task: Ember.computed('model', function() {
    return this.get('model');
  }),
  contact: Ember.computed('model.contact', function() {
    return this.get('model.contact');
  }),
  tasks: Ember.computed('contact.tasks.[]', 'contact.tasks.@each.date', function() {
    return this.model.get('contact.tasks').sortBy('dateDue').reverse();
  }),
  salesOrders: Ember.computed('contact.salesOrders.[]', 'contact.salesOrders.@each.date', function() {
    return this.model.get('contact.salesOrders').sortBy('date').reverse();
  }),
  notes: Ember.computed('contact.notes.[]', 'contact.notes.@each.date', function() {
    return this.model.get('contact.notes').sortBy('date').reverse();
  }),
  actions: {
    taskChangeColor: function() {
      this.set('blink', 'blinker');
      // remove blinker after 1 sec, it must be passed to reference for 'this' so easily we can bind that.
      setTimeout(function() {
        this.set('blink', ' ');
      }.bind(this), 1000);
    }
  }

});
