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
