import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service('notify'),
  actions: {
    changeSave: function(step) {
      //debugger;
      var newStepNumber = {
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

      var newDateDue = {
        dateDue: dateDue,
        task: this.currentModel,
      };
      this.currentModel.set('dateDue', newDateDue.dateDue);
      this.currentModel.save().then(d => {
        this.get('notify').success('Task successfully rescheduled');
        return d;
      }).catch(e => {
        this.get('notify').error(e.message);
        return e;
      });
    },
    newNote: function(noteContent) {
      //debugger;
      var newNoteData = {
        content: noteContent,
        contact: this.currentModel.get('contact'),
        user: this.modelFor('application').account
      };
      this.store.createRecord('note', newNoteData).save().then(() => {
        this.get('notify').success('Note has been saved');
        this.controller.set('noteContent', ' ');
      }, function() {
        this.get('notify').error('Saving Note Failed! MR/MS ' + newNoteData.author);
      });
    }
  }


});
