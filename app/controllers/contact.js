import Ember from 'ember';
//import oapStates from '../utils/oapstates';
//import oapCountires from '../utils/oapcountries';

export default Ember.Controller.extend({
  queryParams: ['refcon', 'backTo', 'step', 'taskrf', 'taskref', 'fundingtag', 'contactrf', 'noterf', 'tnoterf', "sort", "sortDir", "query"],
  notify: Ember.inject.service(),
  step: null,
  refcon: null,
  isSync: false,
  backTo: null,
  blink: null,
  taskrf: null,
  taskref: null,
  fundingtag: null,
  contactrf: null,
  noterf: null,
  tnoterf: null,
  noteText: 'Save',
  btnSuccess: 'btn-success',
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
  tags: Ember.computed('model.tags.[]', function () {
    let tagFromModel = this.get('model.tags');
    return Object.keys(tagFromModel).map(key => tagFromModel[key]);
  }),
  isSilverWebinar: Ember.computed('tags.[]', function () {
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
  taskDetail: Ember.computed('taskrf', function () {
    let taskrf = this.get('taskrf');
    if (taskrf) {
      return this.get('store').peekRecord('task', taskrf);
    }
  }),
  taskDetailReschedule: Ember.computed('taskref', function () {
    let taskref = this.get('taskref');
    if (taskref) {
      return this.get('store').peekRecord('task', taskref);
    }
  }),
  query: '',
  sort: '',
  sortDir: 'asc',
  actions: {
    clone(reference) {
      this.send('duplicateTask', reference);
    },
    changeStep(stepNumber) {
      const validNumbers = [-3,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,130];
      const step = Number(stepNumber);
      if(validNumbers.includes(step)) {
        this.send('changeSave', step);
        this.set('step', null);
      } else {
        this.get('notify').error('Step number is invalid, step number must be between 0 to 21, 130 , -3 or -1');
      }
    },
    updateRescheduleTask(dateDue, taskRef) {
      this.send('dateSave', dateDue, taskRef);
      this.set('taskref', null);
    },
    update(state, country) {

      const getFieldValue = (str) => {
        return this.get(str);
      };

      const fieldsValue = [
        getFieldValue('contact.homePhone'),
        getFieldValue('contact.firstName'),
        getFieldValue('contact.lastName'),
        getFieldValue('contact.cellPhone'),
        getFieldValue('contact.officePhone'),
        getFieldValue('contact.skypeId'),
        getFieldValue('contact.address'),
        getFieldValue('contact.address_2'),
        getFieldValue('contact.city'),
        state,
        country,
        getFieldValue('contact.zipCode')
      ];
      this.send('contactSave', fieldsValue);
      this.set('contactrf', null);
    },
    sync() {
      let contact = this.get('contact');
      this.send('syncContact', contact.id);
      this.set('refcon', null);
    },
    discNote() {
      this.send('discardNote', this.get('noterf'));
      this.set('noterf', null);
    },
    discTaskNote() {
      this.send('discardTaskNote', this.get('tnoterf'));
      this.set('tnoterf', null);
    },
    taskChangeColor() {
      this.set('blink', 'blinker');
      setTimeout(function () {
        this.set('blink', ' ');
      }.bind(this), 1000);
      this.set('taskrf', null);
    },
    populateModal(task) {
      if (task.data.status !== 'pending') {
        this.get('notify').info(`${task.data.status} Task cannot be rescheduled again.`);
        return;
      }
      this.set('taskref', task.id);
    },
    populateModalDetails(task) {
      this.set('taskrf', task.id);
    },
  }
});
