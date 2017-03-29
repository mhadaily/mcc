/*jshint -W117 */
import Ember from 'ember';
const { inject, Controller } = Ember;

export default Controller.extend({
  notify: inject.service('notify'),
  queryParams: ['refid'],
  currentUser: null,
  refid: null,
  actions: {
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
