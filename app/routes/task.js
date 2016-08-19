import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
        alert('Step has been saved to' + newStepNumber.step);

      }, function() {
        alert('Failed to save! Please try later!');
      });
    },

    taskComplete: function() {
      this.currentModel.set('statusEvent', 'complete');
      this.currentModel.save().then(d => {
        alert('task complated');
        return d;
      });
    },

    taskCancel: function() {
      this.currentModel.set('statusEvent', 'cancel');
      this.currentModel.save().then(d => {
        alert('Task hasn been canceled');
        return d;
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
        alert('Note has been saved');
        this.set('noteContent', ' ');
      }, function() {
        alert(newNoteData.author);
        alert('Saving Note Failed!');
      });
    }
  }


});
