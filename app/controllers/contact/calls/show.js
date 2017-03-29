/*jshint -W117 */
import Ember from 'ember';
const { inject, Controller, $ } = Ember;
const { trim } = $;

export default Controller.extend({
  notify: inject.service('notify'),
  queryParams: ['refid', 'ref', 'callrf'],
  currentUser: null,
  refid: null,
  ref: null,
  callrf: null,
  actions: {
    selectOutcome(prop, selection){
      this.set(prop, selection);
    },
    updateRescheduleTask(dateDue) {
      this.send('dateSave', dateDue);
      this.set('taskref', null);
    },
    complete(noteContentModal) {
      let selectedOutcome = this.get('selectedOutcome');
      this.model.set('statusEvent', 'complete');
      this.model.set('outcome', selectedOutcome);
      this.model.set('note', noteContentModal);
      if (trim(noteContentModal)) {
        this.model.save().then(d => {
          this.get('notify').success('Task has been completed with following note :' + noteContentModal + ' and outcome is ' + selectedOutcome);
          this.set('noteContentModal', ' ');
          this.set('ref', null);
          Cookies.remove('_mcc_complete_tmp');
          return d;
        }).catch(e => {
          this.model.rollbackAttributes();
          this.set('ref', null);
          this.get('notify').error(e.message);
        });
      } else {
        this.set('isSync', false);
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
          this.get('notify').success('Task has been cancelled with following note :' + noteContentModal + '!');
          this.set('noteContentModal', ' ');
          this.set('refid', null);
          return d;
        }).catch(e => {
          this.model.rollbackAttributes();
          this.get('notify').error(e.message);
          return e;
        });
      } else {
        this.get('notify').error('Please Select Write a Note before cancel this task.');
        this.set('refid', null);
      }
    },
  },
});
