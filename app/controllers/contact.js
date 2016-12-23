import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['refcon', 'backTo', 'step', 'taskrf', 'contactrf', "sort", "sortDir", "query"],
  step: null,
  refcon: null,
  isSync: false,
  backTo: null,
  blink: null,
  taskrf: null,
  contactrf: null,
  noteText: 'Save',
  btnSuccess: 'btn-success',
  noteContent: null,
  blockHeight: Ember.computed('blockHeight', function() {
    let wheight = parseInt(window.innerHeight - 190, 10);
    // Fix heights on window resize
    let iv = null;
    Ember.$(window).resize(function() {
      if (iv !== null) {
        window.clearTimeout(iv);
      }
      // Needs to be a timeout function so it doesn't fire every ms of resize
      iv = setTimeout(function() {
        Ember.$('.content-block-tab').height(window.innerHeight - 190);
      }, 20);
    });
    return wheight;
  }),
  blockHeightNote: Ember.computed('blockHeightNote', function() {
    let wheight = parseInt(window.innerHeight - 230, 10);
    // Fix heights on window resize
    let iv = null;
    Ember.$(window).resize(function() {
      if (iv !== null) {
        window.clearTimeout(iv);
      }
      // Needs to be a timeout function so it doesn't fire every ms of resize
      iv = setTimeout(function() {
        Ember.$('.content-block').height(window.innerHeight - 230);
      }, 20);
    });
    return wheight;
  }),
  contact: Ember.computed('model', function() {
    return this.get('model');
  }),
  tags: Ember.computed('model.tags.[]', function() {
    let tagFromModel = this.get('model.tags');
    return Object.keys(tagFromModel).map(key => tagFromModel[key]);
  }),
  isSilverWebinar: Ember.computed('tags.[]', function() {
    let tags = this.get('tags');
    let registered = false;
    let attendedLive = false;
    let attendedReply = false;
    tags.find(tag => {
      if (tag === 'Silver Webinar - Registered') {
        registered = true;
      } else if (tag === 'Silver Webinar - Attended Live') {
        attendedLive = true;
      } else if (tag === 'Silver Webinar - Attended Replay') {
        attendedReply = true;
      }
    });
    return {
      registered,
      attendedLive,
      attendedReply,
    };
  }),
  tasks: Ember.computed('model.tasks.[]', 'model.tasks.@each.date', function() {
    return this.get('model.tasks').sortBy('dateDue').reverse();
  }),
  salesOrders: Ember.computed('model.salesOrders.[]', 'model.salesOrders.@each.date', function() {
    return this.get('model.salesOrders').sortBy('date').reverse();
  }),
  notes: Ember.computed('model.notes.[]', 'model.notes.@each.date', function() {
    return this.get('model.notes').sortBy('date').reverse();
  }),
  notes_and_task_notes_union: Ember.computed.union('contact.taskNotes.[]', 'contact.notes.[]'),
  notes_and_task_notes: Ember.computed('notes_and_task_notes_union.@each.date', function() {
    return this.get('notes_and_task_notes_union').sortBy('date').reverse();
  }),
  taskDetail: Ember.computed('taskrf', function() {
    let taskrf = this.get('taskrf');
    if (taskrf) {
      return this.get('store').peekRecord('task', taskrf);
    }
  }),
  query: '',
  sort: '',
  sortDir: 'asc',
  actions: {
    changeStep() {
      let step = Ember.$.trim(Ember.$('input[name="stepNumber"]').val());
      this.send('changeSave', step);
      this.set('step', null);
    },
    update() {
      let homePhone = Ember.$.trim(Ember.$('input[name="homePhone"]').val());
      let skypeId = Ember.$.trim(Ember.$('input[name="skypeId"]').val());
      this.send('contactSave', homePhone, skypeId);
      this.set('contactrf', null);
    },
    sync() {
      let contact = this.get('contact');
      this.send('syncContact', contact.id);
      this.set('refcon', null);
    },
    taskChangeColor() {
      this.set('blink', 'blinker');
      setTimeout(function() {
        this.set('blink', ' ');
      }.bind(this), 1000);
      this.set('taskrf', null);
    },
    populateModal(task) {
      this.set('taskrf', task.id);
    },
  }
});
