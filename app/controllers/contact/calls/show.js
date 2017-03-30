import Ember from 'ember';
const { inject, Controller, $ } = Ember;
const { trim } = $;

export default Controller.extend({
  notify: inject.service('notify'),
  queryParams: ['refid', 'ref', 'callrf'],
  currentUser: null,
  taskrf: null,
  refid: null,
  ref: null,
  callrf: null,
  actions: {
    selectOutcome(prop, selection){
      this.set(prop, selection);
    },
    updateRescheduleTask(dateDue) {
      this.model.set('dateDue', dateDue);
      this.model.save().then(d => {
        this.get('notify').success(`Task ${d.id} successfully rescheduled`);
        this.set('callrf', null);
      }).catch(e => {
        this.model.rollbackAttributes();
        this.get('notify').error(e.message);
      });
    },
    complete(noteContentModal) {
      let selectedOutcome = this.get('selectedOutcome');
      this.model.set('statusEvent', 'complete');
      this.model.set('outcome', selectedOutcome);
      this.model.set('note', noteContentModal);
      if (trim(noteContentModal)) {
        this.model.save().then(d => {
          this.get('notify').success(`Task ${d.id} has been completed with following note : ${noteContentModal} and outcome is ${selectedOutcome}`);
          Cookies.remove('_mcc_complete_tmp');
          this.set('noteContentModal', ' ');
          this.set('ref', null);
        }).catch(e => {
          this.model.rollbackAttributes();
          this.set('ref', null);
          this.get('notify').error(e.message);
        });
      } else {
        $('#com-note-box').addClass('text-danger').append('<span>Note is mandatory</span>');
        this.get('notify').error('Please Select Write a Note before complete this task.');
      }
    },
    cancel(noteContentModal) {
      this.model.set('statusEvent', 'cancel');
      this.model.set('note', noteContentModal);
      if (noteContentModal) {
        this.model.save().then(d => {
          Cookies.remove('_mcc_cancel_tmp');
          this.get('notify').success(`Task ${d.id} has been cancelled with following note: ${noteContentModal}`);
          this.set('noteContentModal', ' ');
          this.set('refid', null);
        }).catch(e => {
          this.model.rollbackAttributes();
          this.get('notify').error(e.message);
          this.set('refid', null);
          return e;
        });
      } else {
        this.get('notify').error('Please Select Write a Note before cancel this task.');
        this.set('refid', null);
      }
    },
  },
});
