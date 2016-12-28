import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service('notify'),
  queryParams: ['backTo', 'step', 'ref', 'taskref', 'refid'],
  step: null,
  ref: null,
  refid: null,
  isSync: false,
  backTo: null,
  taskrf: null,
  taskref: null,
  blink: null,
  noteText: 'Save',
  btnSuccess: 'btn-success',
  isChange: false,
  selectedOutcome: null,
  blockHeight: Ember.computed('blockHeight', function() {
    let wheight = parseInt(window.innerHeight - 245, 10);
    // Fix heights on window resize
    let iv = null;
    Ember.$(window).resize(function() {
      if (iv !== null) {
        window.clearTimeout(iv);
      }
      iv = setTimeout(function() {
        Ember.$('.content-block-tab').height(window.innerHeight - 245);
      }, 20);
    });
    return wheight;
  }),
  blockHeightNote: Ember.computed('blockHeightNote', function() {
    let wheight = parseInt(window.innerHeight - 195, 10);
    let iv = null;
    Ember.$(window).resize(function() {
      if (iv !== null) {
        window.clearTimeout(iv);
      }
      iv = setTimeout(function() {
        Ember.$('.content-block').height(window.innerHeight - 195);
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
  notes_and_task_notes_union: Ember.computed.union('contact.taskNotes.[]', 'contact.notes.[]'),
  notes_and_task_notes: Ember.computed('notes_and_task_notes_union.@each.date', function() {
    return this.get('notes_and_task_notes_union').sortBy('date').reverse();
  }),
  taskDetail: Ember.computed('taskref', function() {
    let taskref = this.get('taskref');
    if (taskref) {
      return this.get('store').peekRecord('task', taskref);
    }
  }),
  actions: {
    selectOutcome(prop, selection){
      this.set(prop, selection);
    },
    update(dateDue) {
      this.send('dateSave', dateDue);
      this.set('taskref', null);
    },
    complete(noteContentModal) {
      this.set('isSync', true);
      let selectedOutcome = this.get('selectedOutcome');
      this.model.set('statusEvent', 'complete');
      this.model.set('outcome', selectedOutcome);
      this.model.set('note', noteContentModal);
      if (Ember.$.trim(noteContentModal)) {
        this.model.save().then(d => {
          this.set('isSync', false);
          this.get('notify').success('Task has been completed with following note :' + noteContentModal + ' and outcome is ' + selectedOutcome);
          this.set('noteContentModal', ' ');
          this.set('ref', null);
          return d;
        }).catch(e => {
          this.model.rollbackAttributes();
          this.set('isSync', false);
          // this.set('ref', null);
          this.get('notify').error(e.message);
          return e;
        });
      } else {
        this.set('isSync', false);
        this.get('notify').error('Please Select Write a Note before complete this task.');
        this.set('ref', null);
      }
    },
    cancel: function() {
      let noteContentModal = Ember.$.trim(Ember.$('textarea[name="noteContentModal"]').val());
      this.set('isSync', true);
      this.model.set('statusEvent', 'cancel');
      this.model.set('note', noteContentModal);
      if (noteContentModal) {
        this.model.save().then(d => {
          this.set('isSync', false);
          this.get('notify').success('Task has been cancelled with following note :' + noteContentModal + '!');
          this.set('noteContentModal', ' ');
          this.set('refid', null);
          return d;
        }).catch(e => {
          this.model.rollbackAttributes();
          this.set('isSync', false);
          // this.set('refid', null);
          this.get('notify').error(e.message);
          return e;
        });
      } else {
        this.set('isSync', false);
        this.get('notify').error('Please Select Write a Note before cancel this task.');
        this.set('refid', null);
      }
    },
    taskChangeColor: function() {
      let _self = this;
      _self.set('blink', 'blinker');
      setTimeout(function() {
        _self.set('blink', ' ');
      }, 1000);
      _self.set('taskref', null);
    },
    populateModal(task){
      this.set('taskref', task.id);
    }
  }
});
