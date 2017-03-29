import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service('notify'),
  queryParams: ['backTo', 'step', 'fundingtag', 'taskrf', 'noterf', 'tnoterf', 'refcon', 'contactrf'],
  step: null,
  isSync: false,
  backTo: null,
  taskrf: null,
  noterf: null,
  tnoterf: null,
  refcon: null,
  contactrf: null,
  fundingtag: null,
  blink: null,
  noteText: 'Save',
  btnSuccess: 'btn-success',
  isChange: false,
  selectedOutcome: null,
  currentUser: null,
  blockHeight: Ember.computed('blockHeight', function () {
    let wheight = parseInt(window.innerHeight - 245, 10);
    // Fix heights on window resize
    let iv = null;
    Ember.$(window).resize(function () {
      if (iv !== null) {
        window.clearTimeout(iv);
      }
      iv = setTimeout(function () {
        Ember.$('.content-block-tab').height(window.innerHeight - 245);
      }, 20);
    });
    return wheight;
  }),
  blockHeightNote: Ember.computed('blockHeightNote', function () {
    let wheight = parseInt(window.innerHeight - 195, 10);
    let iv = null;
    Ember.$(window).resize(function () {
      if (iv !== null) {
        window.clearTimeout(iv);
      }
      iv = setTimeout(function () {
        Ember.$('.content-block').height(window.innerHeight - 195);
      }, 20);
    });
    return wheight;
  }),
  noteContent: null,
  task: Ember.computed('model', function () {
    return this.get('model');
  }),
  contact: Ember.computed('model.contact', function () {
    return this.get('model.contact');
  }),
  tasks: Ember.computed('contact.tasks.[]', 'contact.tasks.@each.date', function () {
    return this.model.get('contact.tasks').sortBy('dateDue').reverse();
  }),
  salesOrders: Ember.computed('contact.salesOrders.[]', 'contact.salesOrders.@each.date', function () {
    return this.model.get('contact.salesOrders').sortBy('date').reverse();
  }),
  notes: Ember.computed('contact.notes.[]', 'contact.notes.@each.date', function () {
    return this.model.get('contact.notes').sortBy('date').reverse();
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
  tags: Ember.computed('model.contact.tags.[]', function () {
    let tagFromModel = this.get('model.contact.tags');
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
  actions: {
    clone(reference) {
      this.send('duplicateTask', reference);
    },
    update(state, country) {
      const getFieldValue = (str) => {
        return this.model.get(str);
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
      let contact = this.model.get('contact').content;
      this.send('syncContact', contact.id);
      this.set('refcon', null);
    },
    selectOutcome(prop, selection){
      this.set(prop, selection);
    },
    updateRescheduleTask(dateDue) {
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
          Cookies.remove("_mcc_complete_tmp");
          return d;
        }).catch(e => {
          this.model.rollbackAttributes();
          this.set('isSync', false);
          this.set('ref', null);
          this.get('notify').error(e.message);
        });
      } else {
        this.set('isSync', false);
        Ember.$('#com-note-box').addClass('text-danger').append('<span>Note is mandatory</span>');
        this.get('notify').error('Please Select Write a Note before complete this task.');
      }
    },
    cancel() {
      let noteContentModal = Ember.$.trim(Ember.$('textarea[name="noteContentModal"]').val());
      this.set('isSync', true);
      this.model.set('statusEvent', 'cancel');
      this.model.set('note', noteContentModal);
      if (noteContentModal) {
        this.model.save().then(d => {
          Cookies.remove("_mcc_cancel_tmp");
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
    taskChangeColor: function () {
      let _self = this;
      _self.set('blink', 'blinker');
      setTimeout(function () {
        _self.set('blink', ' ');
      }, 1000);
      _self.set('taskref', null);
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
    discNote() {
      this.send('discardNote', this.get('noterf'));
      this.set('noterf', null);
    },
    discTaskNote() {
      this.send('discardTaskNote', this.get('tnoterf'));
      this.set('tnoterf', null);
    }
  }
});
