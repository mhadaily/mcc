import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service('notify'),
  disabled: null,
  actions: {
    changeSave: function(step) {
      let newStepNumber = {
        step: step,
        contact: this.currentModel.get('contact.id'),
      };
      this.store.findRecord('contact', newStepNumber.contact).then((contact) => {
        contact.set('step', newStepNumber.step);
        contact.save();
        this.get('notify').success('Step has been saved to ' + newStepNumber.step);
      }, function() {
        this.get('notify').error('Saving Note Failed! MR/MS ');
      });
    },
    dateSave: function(dateDue) {
      this.controller.set('isSync', true);
      let newDateDue = {
        dateDue: dateDue,
        task: this.currentModel,
      };
      this.currentModel.set('dateDue', newDateDue.dateDue);
      this.currentModel.save().then(d => {
        this.controller.set('isSync', false);
        this.get('notify').success('Task successfully rescheduled');
        return d;
      }).catch(e => {
        this.controller.set('isSync', false);
        this.get('notify').error(e.message);
        return e;
      });
    },
    newNote: function(noteContent) {
      Ember.$('button[type="submit"]').prop('disabled', true);
      this.controller.set('btnSuccess', 'btn-danger');
      this.controller.set('noteText', 'Saving note...');
      let newNoteData = {
        content: noteContent,
        contact: this.currentModel.get('contact'),
        user: this.modelFor('application').account
      };
      if (noteContent) {
        this.store.createRecord('note', newNoteData).save().then(() => {
          this.get('notify').success('Note has been saved');
          this.controller.set('noteText', 'Save');
          Ember.$('button[type="submit"]').prop('disabled', false);
          this.controller.set('btnSuccess', 'btn-success');
          this.controller.set('noteContent', ' ');
        }, function() {
          this.get('notify').error('Saving Note Failed! MR/MS ' + newNoteData.author);
          this.controller.set('noteText', 'Save');
          Ember.$('button[type="submit"]').prop('disabled', false);
          this.controller.set('btnSuccess', 'btn-success');
        });
      } else{
        this.get('notify').error('Please Enter a note before saving!');
        Ember.$('button[type="submit"]').prop('disabled', false);
        this.controller.set('btnSuccess', 'btn-success');
        this.controller.set('noteText', 'Save');
      }
    }
  }
});
